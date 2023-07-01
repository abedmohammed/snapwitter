import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  // will make a call to get the current user (which uses serverauth library we made to get the user from the session in next auth)
  // swr will fetch this info if it doesnt already exist, otherwise it will save the data in the global store
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

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

export default useCurrentUser;
