import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}

  fetchTrends(centerPoint: string, radius: number, categories?: string[]) {
    const googleApiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params: any = {
      location: "52.234",
      radius: 2 * 1000,
      types: ['point_of_interest', 'political', 'locality']?.join('|') || undefined,
      key: 'AIzaSyACjnD_w2-D-1jUYHyKv-RRi5_q00rX1C8\n'
    };
    return this.http.get(googleApiUrl, { params });
  }
}
