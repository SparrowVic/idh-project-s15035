import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private _googleMapsAPIKey: string;
  private _drivingAccessibilityRadius: number;
  private _publicTransportAccessibilityRadius: number;

  constructor() { }

  set googleMapsAPIKey(key: string) {
    this._googleMapsAPIKey = key
  }

  get googleMapsAPIKey(): string {
    return this._googleMapsAPIKey;
  }

  set drivingAccessibilityRadius(key: number) {
    this._drivingAccessibilityRadius = key
  }

  get drivingAccessibilityRadius(): number {
    return this._drivingAccessibilityRadius;
  }

  set publicTransportAccessibilityRadius(key: number) {
    this._publicTransportAccessibilityRadius = key
  }

  get publicTransportAccessibilityRadius(): number {
    return this._publicTransportAccessibilityRadius;
  }
}
