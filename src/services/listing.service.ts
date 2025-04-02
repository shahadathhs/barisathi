"use server";

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

export const getLandlordListings = async (token: string, params: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings/landlord?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export const getFirstThreeListings = async (): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings?limit=3`,
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

export const getListingById = async (
  id: string,
  token: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error fetching listing:", error);
    Error(error.message);
  }
};

export const deleteLIstingById = async (id: string, token: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error deleting listing:", error);
    Error(error.message);
  }
};

export const updateListingById = async (
  id: string,
  listingData: IListing,
  token: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/listings/${id}`,
      {
        method: "PATCH",
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
    console.error("Error updating listing:", error);
    Error(error.message);
  }
};