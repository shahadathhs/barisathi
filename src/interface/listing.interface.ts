export interface IListing {
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images?: string[];
  amenities?: string[];
}

export interface Listing {
  _id: string;
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images: string[];
  amenities: string[];
  landlord: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingsResponse {
  listings: Listing[];
  metadata: {
    total: number;
    page: number;
    limit: number;
  };
}