/* eslint-disable @typescript-eslint/no-explicit-any */
import { IListing } from "@/interface/listing.interface";

export const createListing = async (
  listingData: IListing,
  token: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingData),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error creating listing:", error);
    Error(error.message);
  }
};

export const getAllListings = async (params: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    Error(error.message);
  }
};
