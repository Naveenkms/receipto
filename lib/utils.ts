import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function urlToFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  const fileName = url.split("/").pop()!; // assuming url is valid
  return new File([data], fileName, { type: data.type });
}
