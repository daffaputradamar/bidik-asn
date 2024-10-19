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