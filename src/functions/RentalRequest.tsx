import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export enum BookingStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export const getStatusBadge = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        >
          Pending
        </Badge>
      );
    case BookingStatus.APPROVED:
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 hover:bg-blue-100"
        >
          Approved
        </Badge>
      );
    case BookingStatus.REJECTED:
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-800 hover:bg-red-100"
        >
          Rejected
        </Badge>
      );
    case BookingStatus.CONFIRMED:
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Confirmed
        </Badge>
      );
    case BookingStatus.CANCELLED:
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-800 hover:bg-gray-100"
        >
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const getStatusIcon = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case BookingStatus.APPROVED:
      return <Clock className="h-5 w-5 text-blue-500" />;
    case BookingStatus.REJECTED:
      return <XCircle className="h-5 w-5 text-red-500" />;
    case BookingStatus.CONFIRMED:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case BookingStatus.CANCELLED:
      return <XCircle className="h-5 w-5 text-gray-500" />;
    default:
      return null;
  }
};
