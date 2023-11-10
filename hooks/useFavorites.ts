import useSwr from "swr";
import fetcher from "@/libs/fetcher";

import { useUserStore } from "./use-store";

const useMovies = () => {
  const userStore: any = useUserStore();

  const { data, error, isLoading, mutate } = useSwr(
    `${process.env.API_URL}api/v1/users/${userStore?.user?.id}/favorite`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMovies;
