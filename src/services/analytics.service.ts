/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAdminAnalytics = async (token: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/analytics/admin`,
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
    console.error("Error fetching analytics:", error);
    Error(error.message);
  }
};
