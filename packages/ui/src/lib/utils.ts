import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// TODO: use where clsx is used
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
