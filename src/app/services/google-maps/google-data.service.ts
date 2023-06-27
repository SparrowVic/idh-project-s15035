import { Injectable } from '@angular/core';
import { NearbySearchResults } from "../../dtos/google-maps/nearby-search.model";
import { GoogleLocal, GooglePlaceRequest } from "../../models/google-place.model";
import { DetailsResult } from "../../dtos/google-maps/details.model";

@Injectable({
  providedIn: 'root'
})
export class GoogleDataService {
  private _googleNearbySearchResults: NearbySearchResults[] = [];
  private _googleDetailsResult: DetailsResult[] = [];
  private _googlePlacesRequest: GooglePlaceRequest[] = [];
  private _googleLocalRequest: GoogleLocal[] = [];

  constructor() { }

  set googleNearbySearchResults(data: NearbySearchResults[]) {
    this._googleNearbySearchResults.push(...data);
  }

  get googleNearbySearchResults(): NearbySearchResults[] {
    return this._googleNearbySearchResults;
  }

  set googlePlacesRequest(data: GooglePlaceRequest[]) {
    this._googlePlacesRequest.push(...data);
  }

  get googlePlacesRequest(): GooglePlaceRequest[] {
    return this._googlePlacesRequest;
  }

  set googleLocalRequest(data: GoogleLocal[]) {
    this._googleLocalRequest.push(...data);
  }

  get googleLocalRequest(): GoogleLocal[] {
    return this._googleLocalRequest;
  }
}
