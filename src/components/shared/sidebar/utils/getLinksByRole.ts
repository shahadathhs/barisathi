import {
  adminLinks,
  landlordLinks,
  tenantLinks,
} from "@/constant/navigationLinks";

export function getLinksByRole(role?: string) {
  switch (role) {
    case "admin":
      return adminLinks;
    case "tenant":
      return tenantLinks;
    case "landlord":
      return landlordLinks;
    default:
      return [];
  }
}
