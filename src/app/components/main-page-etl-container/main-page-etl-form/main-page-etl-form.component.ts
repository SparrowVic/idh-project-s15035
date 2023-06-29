import { Component, OnDestroy, OnInit } from "@angular/core";
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
import { forkJoin, map, Observable, of, Subject, switchMap, takeUntil, tap } from "rxjs";
import {
  GoogleAccessibilityBody,
  GoogleCategoryBody,
  GoogleLocal,
  GoogleLocalBody, GoogleLocalCategoryBody, GoogleLocationBody,
  GooglePlaceRequest
} from "../../../models/google-place.model";
import { BaseApiService } from "../../../services/api/base-api.service";
import * as uuid from 'uuid';

@Component({
  selector: 'app-main-page-etl-form',
  templateUrl: './main-page-etl-form.component.html',
  styleUrls: ['./main-page-etl-form.component.scss']
})
export class MainPageEtlFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formConfig = MainPageEtlFormConfig;
  data: string;
  counter: number = 1;
  processRunning: boolean = false;
  destroy$ = new Subject<void>();


  //=============
  categories: GoogleCategoryBody[] = [];
  localCategories: GoogleLocalCategoryBody[] = [];
  locations: GoogleLocationBody[] = [];
  accessibilities: GoogleAccessibilityBody[] = [];
  locals: GoogleLocalBody[] = [];
  //===============
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _baseService: BaseService,
    private readonly _googleNearbySearchService: GoogleNearbySearchService,
    private readonly _googleDetailsService: GoogleDetailsService,
    private readonly _googleDataService: GoogleDataService,
    private readonly _baseApiService: BaseApiService) {
  }


  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  startProcess(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();
    this.processRunning = true;
    const values = this.form.value;
    this._baseService.googleMapsAPIKey = values[this.formConfig.googleMapsAPIKey]
    this._baseService.drivingAccessibilityRadius = values[this.formConfig.drivingAccessibilityRadius]
    this._baseService.publicTransportAccessibilityRadius = values[this.formConfig.publicTransportAccessibilityRadius]

    this._googleNearbySearchService.getAllPlaces(values[this.formConfig.pagesNumber])
     .pipe(takeUntil(this.destroy$))
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
          takeUntil(this.destroy$),
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
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp => {
        this._googleDataService.googlePlacesRequest = resp;
        this.mapGoolePlacesToPGoogleLocalRequest();
      })

  }

  mapGoolePlacesToPGoogleLocalRequest(): void {
    const googleLocalRequest: GoogleLocal[] =
      this._googleDataService.googlePlacesRequest
        .map(resp => ({
          placeId: resp.placeId,
          name: resp.name,
          rating: resp.rating,
          reviewCount: resp.userRatingsTotal,
          wheelchairAccessible: resp.wheelchairAccessibleEntrance,
          publicTransport: resp.publicTransport,
          drivingAccess: resp.drivingAccess,
          types: resp.types,

          //Address
          formattedAddress: resp.formattedAddress,
          latitude: resp.geometry.location.lat,
          longitude: resp.geometry.location.lng,
          //Like address components
          postalCode: resp.addressComponents.find(x => x.types.includes("postal_code"))?.long_name, //google response key in types array: postal_code
          country: resp.addressComponents.find(x => x.types.includes("country"))?.long_name, //google response key in types array: country
          city: resp.addressComponents.find(x => x.types.includes("locality"))?.long_name, //google response key in types array: locality
          streetNumber: resp.addressComponents.find(x => x.types.includes("street_number"))?.long_name, //google response key in types array: street_number
          subpremise: resp.addressComponents.find(x => x.types.includes("subpremise"))?.long_name //google response key in types array: subpremise
        }));

    this._googleDataService.googleLocalRequest = googleLocalRequest;
    this.mapGoogleLocalsToApiRequestBodies();
  }

  mapGoogleLocalsToApiRequestBodies(): void {
    // const categories: GoogleCategoryBody[] = [];
    // const localCategories: GoogleLocalCategoryBody[] = [];
    // const locations: GoogleLocationBody[] = [];
    // const accessibilities: GoogleAccessibilityBody[] = [];
    // const locals: GoogleLocalBody[] = [];
    const existingCategoryNames: Set<string> = new Set();
    const uuid = require('uuid');
    const categoryIdsByName: Map<string, string> = new Map();

    this._googleDataService.googleLocalRequest.forEach(googleLocal => {
      const locationId = uuid.v4();
      const accessibilityId = uuid.v4();
      const localId = uuid.v4();

      const accessibility: GoogleAccessibilityBody = {
        id: accessibilityId,
        publicTransport: googleLocal.publicTransport,
        drivingAccess: googleLocal.drivingAccess
      };
      this.accessibilities.push(accessibility);

      const location: GoogleLocationBody = {
        id: locationId,
        formattedAddress: googleLocal.formattedAddress,
        latitude: googleLocal.latitude,
        longitude: googleLocal.longitude,
        postalCode: googleLocal.postalCode || '',
        country: googleLocal.country || '',
        city: googleLocal.city || '',
        streetNumber: googleLocal.streetNumber || '',
        subpremise: googleLocal.subpremise || ''
      };
      this.locations.push(location);

      const local: GoogleLocalBody = {
        id: localId,
        placeId: googleLocal.placeId,
        locationId: locationId,
        accessibilityId: accessibilityId,
        name: googleLocal.name,
        types: googleLocal.types,
        rating: googleLocal.rating,
        reviewCount: googleLocal.reviewCount,
        wheelchairAccessible: googleLocal.wheelchairAccessible
      };
      this.locals.push(local);

      googleLocal.types.forEach(type => {
        let categoryId: string;

        if (categoryIdsByName.has(type)) {
          categoryId = categoryIdsByName.get(type) as string;
        } else {
          categoryId = uuid.v4();
          const category: GoogleCategoryBody = {
            id: categoryId,
            name: type
          };
          this.categories.push(category);
          categoryIdsByName.set(type, categoryId);
        }

        const localCategory: GoogleLocalCategoryBody = {
          localId: localId,
          categoryId: categoryId
        };
        this.localCategories.push(localCategory);
      });
    });

    this._createGooglePlaces(
      this.categories,
      this.localCategories,
      this.locations,
      this.accessibilities,
      this.locals
    );
  }


  private _createGooglePlaces(
    categories: GoogleCategoryBody[],
    localCategories: GoogleLocalCategoryBody[],
    locations: GoogleLocationBody[],
    accessibilities: GoogleAccessibilityBody[],
    locals: GoogleLocalBody[]
  ): void {
    this._baseApiService.createGooglePlaces(
      categories,
      localCategories,
      locations,
      accessibilities,
      locals
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.processRunning = false;
      this.form.enable();
      this._googleNearbySearchService.requestCounter = 0;
    });
  }

  private saveDataToFile(data: any[]): void {
    const fileContent = JSON.stringify(data);
    const filename = 'dane.txt'; // Nazwa pliku do zapisu
    const fileLocation = 'D:/PJATK/mgr/idh-dane/'; // Ścieżka do folderu, gdzie chcesz zapisać plik

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
