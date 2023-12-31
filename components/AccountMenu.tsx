import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/hooks/use-store";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const userStore: any = useUserStore();
  const { push } = useRouter();

  if (!visible) {
    return null;
  }

  const handleSignout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    userStore.logout();
    push("/auth");
  };

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {userStore?.user?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={handleSignout}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;
