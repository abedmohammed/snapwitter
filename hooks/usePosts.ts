import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  if (error) {
    return {
      undefined,
      error,
      isLoading,
      mutate,
    };
  }

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
