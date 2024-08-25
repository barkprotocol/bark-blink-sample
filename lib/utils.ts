import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names using `clsx` and `tailwind-merge`.
 * 
 * - `clsx` handles conditional class names and different input types (strings, arrays, objects).
 * - `twMerge` resolves conflicts between Tailwind CSS utility classes, ensuring correct application of styles.
 *
 * @param inputs - Class names or objects to combine. Can be strings, arrays, or objects.
 * @returns A string of combined and merged class names.
 *
 * @example
 * // Usage examples
 * cn('text-red-500', { 'font-bold': isBold }, ['p-4', 'm-2']);
 * // Combines: "text-red-500 font-bold p-4 m-2"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
