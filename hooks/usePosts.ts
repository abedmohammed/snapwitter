import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePosts = (
  page?: number,
  userId?: string,
  forUserId?: string,
  showAll?: boolean
) => {
  let url;

  if (!showAll && forUserId) {
    url = `/api/posts?forUserId=${forUserId}&page=${page}`;
  } else if (!page) {
    url = "/api/posts";
  } else {
    url = userId
      ? `/api/posts?userId=${userId}&page=${page}`
      : `/api/posts?page=${page}`;
  }

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
