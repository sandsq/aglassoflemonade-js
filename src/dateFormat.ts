const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Parses an ISO date string ("YYYY-MM-DD") without timezone conversion issues.
function parseIsoDate(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split("-").map((part) => parseInt(part, 10));
  return { year, month, day };
}

// Mirrors chrono's "%Y %b %e" format (day is space-padded, not zero-padded).
export function formatDateSpacePadded(iso: string): string {
  const { year, month, day } = parseIsoDate(iso);
  const dayStr = day < 10 ? ` ${day}` : `${day}`;
  return `${year} ${MONTHS[month - 1]} ${dayStr}`;
}

// Mirrors chrono's "%Y %b %d" format (day is zero-padded).
export function formatDateZeroPadded(iso: string): string {
  const { year, month, day } = parseIsoDate(iso);
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year} ${MONTHS[month - 1]} ${dayStr}`;
}
