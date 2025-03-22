/**
 * Formats a given pathname into a readable dashboard title.
 *
 * This function takes a URL pathname, trims any trailing slashes,
 * and extracts the last segment, which is assumed to be the most
 * relevant page title. It then converts any hyphenated words in
 * this segment into spaced, capitalized words to provide a more
 * readable title format.
 *
 * @example
 * formatDashboardTitle("/dashboard/property-list") => "Property List"
 * formatDashboardTitle("/dashboard/property-list/") => "Property List"
 * formatDashboardTitle("/dashboard/property-list/1") => "1"
 * formatDashboardTitle("/dashboard/property-list/1/") => "1"
 * formatDashboardTitle("/dashboard/property-list/1/edit") => "Edit"
 *
 * @param pathname - The URL pathname to be formatted.
 * @returns The formatted dashboard title as a string.
 */

export function formatDashboardTitle(pathname: string): string {
  if (!pathname) return ""; // Handle empty pathname safely

  // Remove trailing slash if exists.
  const trimmed = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const segments = trimmed.split("/");

  // Extract the last segment (most relevant page title)
  const lastSegment = segments[segments.length - 1];

  // Convert hyphenated words into spaced, capitalized words.
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
