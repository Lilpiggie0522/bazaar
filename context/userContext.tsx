"use client"

import { useState } from "react"

export function useLocalStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setStateRaw] = useState<T>(getStorageItem(key, defaultValue))
  const setState: React.Dispatch<React.SetStateAction<T>> = (value) => {
    saveStorageItem(key, value as string)
    setStateRaw(value)
  }

  return [state, setState]
}

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key)
    if (value) {
      return value as T
    }
  }
  return defaultValue
}

function saveStorageItem(key: string, value: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value)
  }
}