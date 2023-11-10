import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then((res) => res.data);

export default fetcher;
