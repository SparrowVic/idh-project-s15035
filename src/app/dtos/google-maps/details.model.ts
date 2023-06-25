
export interface DetailsResponse {
  html_attributions: string,
  result: DetailsResult
}

export interface DetailsResult {
  address_components: any[],
  formatted_address: string;
  place_id: string,
  wheelchair_accessible_entrance: boolean
}
