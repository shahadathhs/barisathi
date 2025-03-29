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
    if (!res.ok) {
      throw new Error("Failed to create Rental Listing");
    }
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error creating listing:", error);
    Error(error.message);
  }
};
