import { AuthToken } from "@/types/authToken";
import { User } from "@/types/user";

export const AUTH_TOKEN_STORAGE_KEY = "AUTH_TOKEN_STORE";

export function useStorage() {
  function saveAuthStorage(tokens: AuthToken): void {
    if (typeof window == "undefined") return undefined;
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  }

  function getAuthStorage(): AuthToken | null {
    if (typeof window == "undefined") return null;
    const tokens = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    return tokens ? JSON.parse(tokens) : null;
  }

  function removeAuthStorage(): void {
    if (typeof window == "undefined") return undefined;
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  return {
    saveAuthStorage,
    getAuthStorage,
    removeAuthStorage,
  };
}
