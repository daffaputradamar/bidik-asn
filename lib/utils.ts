import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { hash, compare } from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};


export const stripHtmlTags = (str: string) => { 
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export function DateToUTCDateTime(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

export function DateToUTCDate(date: Date): Date {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate;
}