export interface GooglePlaceRequest {
  addressComponents: {
    long_name: string,
    short_name: string,
    types: string[]
  }[],
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

export interface GoogleLocal {
  placeId: string,
  name: string,
  rating: number,
  reviewCount: number,
  wheelchairAccessible: boolean,
  publicTransport: boolean,
  drivingAccess: boolean,
  types: string[],
  //Address
  formattedAddress: string,
  latitude: number,
  longitude: number,
  //Like address components
  postalCode?: string,
  country?: string,
  city?: string,
  streetNumber?: string,
  subpremise?: string
}

export interface GoogleLocalBody {
  id: string,
  placeId: string,
  locationId: string,
  accessibilityId: string,
  name: string,
  rating: number,
  reviewCount: number,
  wheelchairAccessible: boolean,
  types: string[]
}

export interface GoogleCategoryBody {
  id: string,
  name: string
}

export interface GoogleLocalCategoryBody {
  localId: string,
  categoryId: string
}

export interface GoogleLocationBody {
  id: string,
  formattedAddress: string,
  latitude: number,
  longitude: number,
  postalCode: string,
  country: string,
  city: string,
  streetNumber: string,
  subpremise: string,
}

export interface GoogleAccessibilityBody {
  id: string,
  publicTransport: boolean,
  drivingAccess: boolean,
}

export interface GoogleLocalApiRequest {
  locals: GoogleLocalBody[],
  categories: GoogleCategoryBody[],
  locations: GoogleLocationBody[],
  accessibilities: GoogleAccessibilityBody[],
  localCategories: GoogleLocalCategoryBody[],
}
