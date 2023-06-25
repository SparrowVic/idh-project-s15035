import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {iif, Observable, of, switchMap, tap} from "rxjs";
import {BaseService} from "../../base.service";
import { NearbySearchResponse, NearbySearchResults } from "../../../dtos/google-maps/nearby-search.model";
import { DetailsResponse } from "../../../dtos/google-maps/details.model";
import { GooglePlaceRequest } from "../../../models/google-place.model";
import { GoogleDataService } from "../google-data.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleNearbySearchService {
  private url = `${environment.proxyUrl}${environment.googleUrl}place/nearbysearch/json?`;
  private _numOfRequestsForGetAllPlaces:number;
  private _requestCounter = 0;


  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _baseService: BaseService,
    private readonly _googleDataService: GoogleDataService) {
  }

  getAllPlaces(numOfRequests: number): Observable<NearbySearchResponse> {
    this._numOfRequestsForGetAllPlaces = numOfRequests;
    // In nearbysearch service case fields param doesn't work, just doesn't exist
    // const fields = ['geometry', 'name', 'place_id', 'rating', 'types', 'user_ratings_total', 'vicinity'];
    // const fieldsParams = fields.join(',')

    const params: HttpParams = new HttpParams()
      .append("location", "52.237049,21.017532")
      .append("radius", 10000)
      // .append("fields", fieldsParams)
      .append("key", this._baseService.googleMapsAPIKey);


    return this._httpClient.get<NearbySearchResponse>(this.url, {params})
      .pipe(
        tap((resp) => {
          this._googleDataService.googleNearbySearchResults = resp.results;
          this._requestCounter++;
        }),
        switchMap((resp) => this._getAllPlacesWithNextPageToken(resp.next_page_token))
      )
  }

  private _getAllPlacesWithNextPageToken(nextPageToken: string): Observable<NearbySearchResponse> {
    const params: HttpParams = new HttpParams()
      .append("location", "52.237049,21.017532")
      .append("radius", 10000)
      .append("key", this._baseService.googleMapsAPIKey)
      .append("next_page_token", nextPageToken);

    return this._httpClient.get<NearbySearchResponse>(this.url, {params})
      .pipe(
        tap((resp) => {
          this._googleDataService.googleNearbySearchResults = resp.results;
          this._requestCounter++;
        }),
        switchMap((resp) =>
          iif(() =>
              (this._requestCounter < this._numOfRequestsForGetAllPlaces),
            this._getAllPlacesWithNextPageToken(resp.next_page_token),
            of({} as NearbySearchResponse))
        )
      )
  }

  getDrivingAccessibility(lat: number, lng: number): Observable<any> {
    const location = [lat, lng]
    // const location = ["52.2277982", "21.0044324"]
    const locationParams = location.join(',')

    const params: HttpParams = new HttpParams()
      .append("location", locationParams)
      .append("radius", this._baseService.drivingAccessibilityRadius)
      .append("type", "transit_station")
      .append("key", this._baseService.googleMapsAPIKey);


    return this._httpClient.get<DetailsResponse>(this.url, {params})
  }

  getPublicTransportAccessibility(lat: number, lng: number): Observable<any> {
    const location = [lat, lng]
    // const location = ["52.2277982", "21.0044324"]
    const locationParams = location.join(',')

    const params: HttpParams = new HttpParams()
      .append("location", locationParams)
      .append("radius", this._baseService.publicTransportAccessibilityRadius)
      .append("type", "parking")
      .append("key", this._baseService.googleMapsAPIKey);


    return this._httpClient.get<DetailsResponse>(this.url, {params})
  }
}
