import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Input from "@/components/Input";
import GoogleAuth from "@/components/google-auth";
import { useUserStore } from "@/hooks/use-store";

const Auth = () => {
  const userStore: any = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}api/v1/users/login`,
        { email, password }
      );

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      if (response.status === 200) {
        userStore.setUser({
          id: response.data.data.user._id,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          photo: `${process.env.API_URL}api/v1/users/get-photo/${response.data.data.user._id}`,
        });
        router.push("/profiles");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router, userStore]);

  const register = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}api/v1/users/signup`,
        { username, email, password, passwordConfirm }
      );

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);

      if (response.status === 201) {
        userStore.setUser({
          id: response.data.data.user._id,
          name: response.data.data.user.username,
          email: response.data.data.user.email,
          photo: `${process.env.API_URL}api/v1/users/get-photo/${response.data.data.user._id}`,
        });
        router.push("/profiles");
      }
    } catch (error) {
      console.log(error);
    }
  }, [username, email, password, passwordConfirm, userStore, router]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={username}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
              {variant !== "login" && (
                <Input
                  type="password"
                  id="passwordConfirm"
                  label="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e: any) => setPasswordConfirm(e.target.value)}
                />
              )}
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <GoogleAuth />
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
