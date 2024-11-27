import { CardData, ResponseGetAll } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchAllUrls(): Promise<CardData[]> {
  const resp = await fetch("http://localhost:3000/urls");
  if (!resp.ok) {
    throw new Error("Error en la petición de las url");
  }

  const { data }: ResponseGetAll = await resp.json();
  return data;
}

export function getDaysToExpire(expires_at: string) {
  const now = new Date();
  const expire = new Date(expires_at);
  const utcNow = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const utcExpiration = new Date(
    Date.UTC(expire.getFullYear(), expire.getMonth(), expire.getDate())
  );

  const millisecondsToDifference = utcExpiration.getTime() - utcNow.getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(millisecondsToDifference / msPerDay);
  return days > 0 ? days : 0;
}
