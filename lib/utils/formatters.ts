import { formatDistanceToNow, format } from "date-fns";

/**
 * Formats a follower count number to a human-readable string
 * Converts large numbers to K or M format (e.g. 1.2K, 3.5M)
 * 
 * @param count Number to format or null
 * @returns Formatted string representation
 */
export const formatFollowerCount = (count: number | null): string => {
  if (count === null) return "-";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

/**
 * Formats a timestamp to a human-readable string
 * Returns relative time (e.g. "2 hours ago") and optionally the full date
 * 
 * @param timestamp ISO date string to format
 * @param short If true, returns only the relative time without the full date
 * @returns Formatted timestamp string
 */
export const formatTimestamp = (timestamp: string, short = false): string => {
  try {
    if (short) {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    }
    return `${formatDistanceToNow(new Date(timestamp), { addSuffix: true })} (${format(new Date(timestamp), "PPP")})`;
  } catch {
    return "Recently";
  }
}; 