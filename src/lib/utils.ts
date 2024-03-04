import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDurationString(duration: string) {
  if (!duration) return ''
  const d = JSON.parse(duration)
  console.log(d)
  const hours = d.hours
  const minutes = d.minute
  const seconds = d.seconds
  return hours > 0 ? `${hours} hour ${minutes} min` : `${minutes} min ${seconds} sec`
}
