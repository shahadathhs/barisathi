export interface IListing {
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  images?: string[];
  amenities?: string[];
}
