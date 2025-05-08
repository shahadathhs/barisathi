export type Distribution = {
  _id: string;
  count: number;
};

export type UserAnalytics = {
  totalUsers: number;
  activeCount: number;
  inactiveCount: number;
  rolesDistribution: Distribution[];
};

export type BookingAnalytics = {
  statusDistribution: Distribution[];
  monthlyBookings: { month: string; count: number }[];
};

export type ListingAnalytics = {
  totalListings: number;
  averageRent: number;
  bedroomsDistribution: Distribution[];
  locationDistribution: Distribution[];
};

export type TotalCountAnalytics = {
  totalUsers: number;
  totalBookings: number;
  totalListings: number;
};

export type AdminAnalytics = {
  userAnalytics: UserAnalytics;
  bookingAnalytics: BookingAnalytics;
  listingAnalytics: ListingAnalytics;
  totalCountAnalytics: TotalCountAnalytics;
};
