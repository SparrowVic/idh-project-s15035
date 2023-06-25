import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainPageEtlFormConfig} from "./enums/main-page-etl-form-config.enum";
import {BaseService} from "../../../services/base.service";
import {
  GoogleNearbySearchService,
} from "../../../services/google-maps/google-maps-place-api/nearby-search.service";
import {
  GoogleDetailsService
} from "../../../services/google-maps/google-maps-place-api/details.service";
import { GoogleDataService } from "../../../services/google-maps/google-data.service";
import { forkJoin, map, Observable, of, switchMap, tap } from "rxjs";
import { GooglePlaceRequest } from "../../../models/google-place.model";

@Component({
  selector: 'app-main-page-etl-form',
  templateUrl: './main-page-etl-form.component.html',
  styleUrls: ['./main-page-etl-form.component.scss']
})
export class MainPageEtlFormComponent implements OnInit {
  form: FormGroup;
  formConfig = MainPageEtlFormConfig;
  data: string;
  counter: number = 1;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _baseService: BaseService,
    private readonly _googleNearbySearchService: GoogleNearbySearchService,
    private readonly _googleDetailsService: GoogleDetailsService,
    private readonly _googleDataService: GoogleDataService) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  startProcess(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.value;
    this._baseService.googleMapsAPIKey = values[this.formConfig.googleMapsAPIKey]
    this._baseService.drivingAccessibilityRadius = values[this.formConfig.drivingAccessibilityRadius]
    this._baseService.publicTransportAccessibilityRadius = values[this.formConfig.publicTransportAccessibilityRadius]

    this._googleNearbySearchService.getAllPlaces(values[this.formConfig.pagesNumber])
     .subscribe(() => this.getPlaceDetails())
  }

  private _initForm(): void {
    this.form = this._fb.group({
      [this.formConfig.pagesNumber]: new FormControl(1, Validators.required),
      [this.formConfig.googleMapsAPIKey]: new FormControl(null, Validators.required),
      [this.formConfig.drivingAccessibilityRadius]: new FormControl(200, Validators.required),
      [this.formConfig.publicTransportAccessibilityRadius]: new FormControl(100, Validators.required),
    })
  }

  getPlaceDetails(): void {
    const placeDetailsRequests$: Observable<GooglePlaceRequest>[] = [];

    this._googleDataService.googleNearbySearchResults.forEach(place => {
      placeDetailsRequests$.push(this._googleDetailsService.getPlaceDetails(place.place_id)
        .pipe(
          switchMap(placeDetails => {
            return forkJoin({
              placeDetails: of(placeDetails),
              drivingAccessibility: this._googleNearbySearchService.getDrivingAccessibility(place.geometry.location.lat, place.geometry.location.lng),
              publicTransportAccessibility: this._googleNearbySearchService.getPublicTransportAccessibility(place.geometry.location.lat, place.geometry.location.lng),
            });
          }
          ),
          map(({placeDetails, drivingAccessibility, publicTransportAccessibility}) => ({
            ...place,
            placeId: place.place_id,
            addressComponents: placeDetails.result.address_components,
            formattedAddress: placeDetails.result.formatted_address,
            wheelchairAccessibleEntrance: placeDetails.result.wheelchair_accessible_entrance,
            userRatingsTotal: place.user_ratings_total,
            publicTransport: drivingAccessibility.results.length !== 0,
            drivingAccess: publicTransportAccessibility.results.length !== 0
          }))
        )
      )
    })

    forkJoin(placeDetailsRequests$)
      .subscribe(resp => {
        this._googleDataService.googlePlacesRequest = resp;
      })

  }
}
