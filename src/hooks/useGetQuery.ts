import axiosInstance from "../lib/axios";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

import type { AxiosRequestConfig } from "axios";

interface UseGetQueryProps<TData> extends Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>,
  "queryKey" | "queryFn"
> {
  endpoint: string;
  queryKey: QueryKey;
  params?: AxiosRequestConfig["params"];
}

const useGetQuery = <TData>({
  endpoint,
  queryKey,
  params,
  ...options
}: UseGetQueryProps<TData>) => {
  return useQuery<TData, Error>({
    queryKey: [...queryKey, params],

    queryFn: async () => {
      const { data } = await axiosInstance.get<TData>(endpoint, {
        params,
      });

      return data;
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: true,

    ...options,
  });
};

export default useGetQuery;
