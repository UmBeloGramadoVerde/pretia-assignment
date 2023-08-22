import { User } from "@/types/user";
import {
  DefinedUseQueryResult,
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { useEffect, useState } from "react";
import { AuthToken } from "@/types/authToken";
import { useApi } from "./useApi";
import { BaseApiResponse } from "@/types/api";
import axios from "axios";

export const ME_QUERY_KEY = "me";

interface IUseUser {
  meQuery: UseQueryResult<User | null | undefined>;
  me: User | null | undefined;
}

export function useMe(): IUseUser {
  const api = useApi();

  const meQuery = useQuery(
    [ME_QUERY_KEY],
    async (): Promise<User | null> =>
      api.get("/api/users/me").then((response) => response.data),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return {
    meQuery,
    me: meQuery.data,
  };
}
