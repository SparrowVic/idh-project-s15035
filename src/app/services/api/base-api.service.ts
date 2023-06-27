import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseService } from "../base.service";
import { Observable } from "rxjs";
import { DetailsResponse } from "../../dtos/google-maps/details.model";
import { GoogleDataService } from "../google-maps/google-data.service";
import {
  GoogleAccessibilityBody,
  GoogleCategoryBody,
  GoogleLocalApiRequest, GoogleLocalBody,
  GoogleLocalCategoryBody,
  GoogleLocationBody
} from "../../models/google-place.model";

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private url = `${environment.apiUrl}`;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _googleDataService: GoogleDataService) {
  }

  createGooglePlaces(
    categories: GoogleCategoryBody[],
    localCategories: GoogleLocalCategoryBody[],
    locations: GoogleLocationBody[],
    accessibilities: GoogleAccessibilityBody[],
    locals: GoogleLocalBody[]
  ): Observable<string> {
    const request: GoogleLocalApiRequest = {
      locals: locals,
      categories: categories,
      locations: locations,
      accessibilities: accessibilities,
      localCategories: localCategories,
    }


    return this._httpClient.post<string>(`${this.url}create-google-locals`, request);
  }
}
