import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";

import { app } from "@/libs/firebase";
import { useUserStore } from "@/hooks/use-store";

export default function GoogleAuth() {
  const router = useRouter();
  const userStore: any = useUserStore();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${process.env.API_URL}api/v1/users/google-login`,
        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data.data.user);

        userStore.setUser({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          id: response.data.data.user._id,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          photo: response.data.data.user.photo,
        });
        router.push("/profiles");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4 mt-8 justify-center">
      <div
        onClick={handleGoogleAuth}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
      >
        <FcGoogle size={32} />
      </div>
    </div>
  );
}
