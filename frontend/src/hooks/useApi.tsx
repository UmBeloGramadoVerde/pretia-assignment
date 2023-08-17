import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useStorage } from "./useStorage";

export function useApi<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const { getAuthStorage } = useStorage();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getAuthStorage();
      return fetcher(queryKey[1], token?.accessToken ?? "");
    },
    ...options
  });
}