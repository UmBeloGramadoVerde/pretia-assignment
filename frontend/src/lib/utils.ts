import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

const DEFAULT = "-";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: string): string {
  if (!timestamp || !dayjs(timestamp).format("MMM DD YYYY")) return DEFAULT;
  return dayjs(timestamp).format("MMM DD YYYY");
}

export function applyPrecision(floatNumber: number): number | string {
  if ((floatNumber !== 0 && !floatNumber) || !floatNumber.toFixed(2))
    return DEFAULT;
  return floatNumber.toFixed(2);
}

export function getImageLink(apiImageFilename: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}/${apiImageFilename}`;
}

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem('token') || 'null'),
  setToken: (token: any) =>
    window.localStorage.setItem('token', JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem('token'),
};