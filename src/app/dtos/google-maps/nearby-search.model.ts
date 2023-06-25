// export class NearbySearchRequest {
//   longitude: string = "52.237049";
//   latitude: string = "21.017532";
//   radius: number = 10000;
//
//   // constructor(longitude?: string, latitude?: string, radius?: number) {
//   //   this.longitude = longitude ??;
//   //   this.latitude = latitude;
//   //   this.radius = radius;
//   // }
//
// }
//
// //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.237049,21.017532&radius=10000&type=restaurant&key=

export interface NearbySearchResponse {
  html_attributions: string,
  next_page_token: string,
  results: NearbySearchResults[]
}

export interface NearbySearchResults {
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
  "name": string,
  "opening_hours": {
    "open_now": true
  },
  "place_id": string,
  "rating": number,
  "types": string[],
  "user_ratings_total": number,
  "vicinity": string
}
