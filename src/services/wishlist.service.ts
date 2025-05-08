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
