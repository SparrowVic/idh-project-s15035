import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _googleMapsAPIKey: string;

  constructor() { }

  set googleMapsAPIKey(key: string) {
    this._googleMapsAPIKey = key
  }

  get googleMapsAPIKey(): string {
    return this._googleMapsAPIKey;
  }
}
