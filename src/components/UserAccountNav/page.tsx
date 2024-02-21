import React from "react";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { signOutLogo } from "../../../assets";
import Image from "next/image";
const UserAccountNav = () => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center outline-none">
        <Avatar className="ring-[#FE8116] ring ">
          <AvatarImage
            src={
              session?.user?.image ||
              "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
                        }
          />
        </Avatar>
                {session?.user.role=== 'ADMIN' ? <div className="flex items-center justify-center font-medium text-[#FE8116] ml-2"><span className="text-[22px] ">Admin</span> <ChevronDown className="w-[28px] h-[28px] ml-1 text-[#FE8116] " /> </div> : ''}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded-[10px] w-[312px] mr-4 mt-4">
        <h2 className="font-medium text-center capitalize text-[26px]">
          {session?.user?.name}
        </h2>
                <p className="text-center text-[#696969] text-[14px]">{session?.user?.role === "ADMIN" ? 'Admin': ''}</p>
        <DropdownMenuSeparator className="h-1" />
        <div onClick={() => signOut()} className="flex gap-2">
          <Image src={signOutLogo} alt=" " /> <span>Sign out</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
