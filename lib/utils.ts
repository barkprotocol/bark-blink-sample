import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names.
 * - Uses `clsx` to handle conditional class names and other variations.
 * - Uses `twMerge` to handle merging of Tailwind CSS classes, ensuring that conflicting utility classes are resolved.
 *
 * @param inputs - Class names or objects to combine. Can be strings, arrays, or objects.
 * @returns A string of combined and merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
