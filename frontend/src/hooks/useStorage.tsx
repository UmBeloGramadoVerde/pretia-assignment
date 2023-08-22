import { AuthToken } from "@/types/authToken";
import { User } from "@/types/user";

const USER_STORAGE_KEY = "USER_STORE";
const AUTH_TOKEN_STORAGE_KEY = "AUTH_TOKEN_STORE";

export function useStorage() {
  function saveUserStorage(user: User): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  function getUserStorage(): User | undefined {
    if (typeof window == "undefined") return undefined;
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : undefined;
  }

  function removeUserStorage(): void {
    if (typeof window == "undefined") return undefined;
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  function saveAuthStorage(tokens: AuthToken): void {
    if (typeof window == "undefined") return undefined;
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  }

  function getAuthStorage(): AuthToken | undefined {
    if (typeof window == "undefined") return undefined;
    const tokens = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    return tokens ? JSON.parse(tokens) : undefined;
  }

  function removeAuthStorage(): void {
    if (typeof window == "undefined") return undefined;
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  return {
    saveUserStorage,
    getUserStorage,
    removeUserStorage,
    saveAuthStorage,
    getAuthStorage,
    removeAuthStorage,
  };
}
