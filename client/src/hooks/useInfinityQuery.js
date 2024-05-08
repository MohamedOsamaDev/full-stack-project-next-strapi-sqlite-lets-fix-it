"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
const useInfinityQuery = ({ Key, next, options }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: Key,
    queryFn: next,
    getNextPageParam: (res) => {
      let page = res?.pagination?.page;
      let pageCount = res?.pagination?.pageCount;
      if (!pageCount || !page) return undefined;
      return page < pageCount ? page + 1 : undefined;
    },
    select: (data) => {
      return data.pages;
    },
    ...options,
    refetchOnWindowFocus: false, // If the user switches tabs and comes back, the data will be refetched if true !!
    // enabled: true, // The query will be fetched automatically when the component mounts.
    // staleTime: 1000 * 60 * 15, // Data will be removed from the cache 10 minutes after it's fetched,
    // cacheTime: 1000 * 60 * 30, //  regardless of whether it's still considered fresh based on `staleTime`.
  });
  return {
    data: data?.flatMap((page) => page?.results), // for marge all pages
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};

export default useInfinityQuery;
// refetchInterval: 1000 * 60 * 2,
// Refetch every 2 minutes , The query will automatically refetch data every 2 minutes
//  even if the user isn't actively interacting with the component.
