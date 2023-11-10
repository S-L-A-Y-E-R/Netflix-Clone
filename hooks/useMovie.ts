import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr(
    id ? `${process.env.API_URL}api/v1/movies/${id}` : null,
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

export default useMovie;
