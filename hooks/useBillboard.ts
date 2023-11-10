import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSwr(
    `${process.env.API_URL}api/v1/movies/random`,
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

export default useBillboard;
