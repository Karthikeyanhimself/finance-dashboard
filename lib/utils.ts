import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines tailwind classes safely without conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a raw number into a USD currency string (e.g., $1,234.56)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Formats an ISO date string to a more readable format (e.g., Jan 15, 2025)
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Returns specific tailwind color classes based on the category
// Note: Hardcoding the full class names is necessary for Tailwind's scanner
export function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "food":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    case "transport":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "entertainment":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "utilities":
      return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
    case "shopping":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
    case "salary":
      return "bg-income/20 text-income";
    case "freelance":
      return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}