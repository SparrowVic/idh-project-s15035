import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainPageEtlFormConfig} from "./enums/main-page-etl-form-config.enum";
import {BaseService} from "../../../services/base.service";
import {NearbySearchService} from "../../../services/google-maps/google-maps-place-api/nearby-search.service";
import {iif, Observable, of, switchMap, tap} from "rxjs";

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
    private readonly fb: FormBuilder,
    private readonly _baseService: BaseService,
    private readonly _nearbySearchService: NearbySearchService) {
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

    this._nearbySearchService.getAllPlaces(5).subscribe()
  }

  private _initForm(): void {
    this.form = this.fb.group({
      [this.formConfig.pagesNumber]: new FormControl(5, Validators.required),
      [this.formConfig.googleMapsAPIKey]: new FormControl(null, Validators.required),
    })
  }
}
