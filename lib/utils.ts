import { genSalt, hash } from "bcrypt-ts"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hashPassword(password: string) {
  const salt = await genSalt(10)
  const hashed = await hash(password, salt)
  return hashed
}