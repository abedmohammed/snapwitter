import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePost = (postId?: string) => {
  const url = postId ? `/api/posts/${postId}` : null;

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

export default usePost;
