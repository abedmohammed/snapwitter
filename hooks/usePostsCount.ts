import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePostsCount = (userId?: string) => {
  const url = userId ? `/api/posts/count?userId=${userId}` : `/api/posts/count`;

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

export default usePostsCount;
