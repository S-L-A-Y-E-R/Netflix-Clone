import useSwr from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr(
    `${process.env.API_URL}api/v1/users/me`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
