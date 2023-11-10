import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useMovies = () => {
  const { data, error, isLoading } = useSwr(
    `${process.env.API_URL}api/v1/movies`,
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
  };
};

export default useMovies;
