export interface GooglePlaceRequest {
  addressComponents: any[],
  formattedAddress: string;
  name: string,
  placeId: string,
  wheelchairAccessibleEntrance: boolean,
  "geometry": {
    "location": {
      "lat": number,
      "lng": number
    },
    "viewport": {
      "northeast": {
        "lat": number,
        "lng": number
      },
      "southwest": {
        "lat": number,
        "lng": number
      }
    }
  },
  // "openingHours": {
  //   "openNow": true
  // },
  "rating": number,
  "types": string[],
  "userRatingsTotal": number,
  "vicinity": string,
  //accessibility
  publicTransport: boolean,
  drivingAccess: boolean
}

export interface LocalRequest {
  placeId: string,
  name: string,
  rating: number,
  reviewCount: number,
  wheelchairAccessible: boolean

  //Address
  formattedAddress: string,
  latitude: number,
  longitude: number,
  //Like address components
  postalCode: string, //google response key in types array: postal_code
  country: string, //google response key in types array: country
  city: string, //google response key in types array: locality
  streetNumber: string, //google response key in types array: street_number
  subpremise: string //google response key in types array: subpremise
}

// export interface LocationRequest {
//   formattedAddress: string,
//   latitude: number,
//   longitude: number,
//   city: string,
//   state: string,
//   country: string,
// }

export interface CategoryRequest {
  name: string
}

export interface AccessibilityRequest {
  publicTransport: boolean,
  drivingAccess: boolean,
}
