/* eslint-disable @typescript-eslint/no-explicit-any */

export const getWishlist = async (token: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/wishlist/tenant`,
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
    console.error("Error fetching wishlist:", error);
    Error(error.message);
  }
};

export const addToOrRemoveFromWishlist = async (
  listingId: string,
  action: "add" | "remove",
  token: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/wishlist`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, action }),
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Error adding to wishlist:", error);
    Error(error.message);
  }
};
