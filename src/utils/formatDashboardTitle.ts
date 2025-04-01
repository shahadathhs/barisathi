export function formatDashboardTitle(pathname: string): string {
  if (!pathname) return ""; // Handle empty pathname safely

  // Remove trailing slash if exists.
  const trimmed = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const segments = trimmed.split("/");

  // Extract the last segment (most relevant page title), second last segment when segments's length is 3
  const lastSegment = segments[2] || segments[1];

  // Convert hyphenated words into spaced, capitalized words.
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
