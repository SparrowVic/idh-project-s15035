import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {iif, Observable, of, switchMap, tap} from "rxjs";
import {BaseService} from "../../base.service";
import {NearbySearchResponse} from "../../../dtos/google-maps/nearby-search.model";

@Injectable({
  providedIn: 'root'
})
export class NearbySearchService {
  private url = `${environment.proxyUrl}${environment.googleUrl}place/nearbysearch/json?`;
  private _numOfRequestsForGetAllPlaces:number;
  private _requestCounter = 0;

  data: any = [];

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _baseService: BaseService) {
  }

  getAllPlaces(numOfRequests: number): Observable<NearbySearchResponse> {
    this._numOfRequestsForGetAllPlaces = numOfRequests;

    const params: HttpParams = new HttpParams()
      .append("location", "52.237049,21.017532")
      .append("radius", 10000)
      .append("key", this._baseService.googleMapsAPIKey);


    return this._httpClient.get<NearbySearchResponse>(this.url, {params})
      .pipe(
        tap((resp) => {
          this.data.push(resp.results);
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
          this.data.push(...resp.results);
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
}
