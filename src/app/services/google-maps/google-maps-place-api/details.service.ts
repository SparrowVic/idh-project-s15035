import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DetailsResponse } from "../../../dtos/google-maps/details.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { BaseService } from "../../base.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleDetailsService {
  private url = `${environment.proxyUrl}${environment.googleUrl}place/details/json?`;

  data: any = [];

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _baseService: BaseService) {
  }

  getPlaceDetails(placeId: string): Observable<DetailsResponse> {
    const fields = ['place_id', 'address_components', 'formatted_address', 'wheelchair_accessible_entrance'];
    const fieldsParams = fields.join(',')

    const params: HttpParams = new HttpParams()
      .append("place_id", placeId)
      .append("fields", fieldsParams)
      .append("key", this._baseService.googleMapsAPIKey);


    return this._httpClient.get<DetailsResponse>(this.url, {params})
  }
}
