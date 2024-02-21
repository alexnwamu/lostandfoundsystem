"use client";
import React, { useState } from "react";
import "../globals.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
const AdminLogin = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { toast } = useToast();
  const [data, setData] = useState({ email: "", password: "" });

  const loginAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signInRes = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (signInRes?.error === "CredentialsSignin") {
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Email or Password not correct",
      });
    } else if (signInRes?.ok) {
      router.push("/dashboard");
    }
  };

  if (session?.user.role === "ADMIN") {
    return (
      <div className="h-screen text-center">
        <h1 className="text-5xl pt-14">You are signed in as an Admin</h1>

        <Link
          href={"/dashboard"}
          className="w-[475px] underline text-blue-500 pl-[35px] mt-12 gap-2 inline-flex"
        >
          {" "}
          <ArrowLeft /> Go to the Admin Dashboard{" "}
        </Link>
        <Link
          href={"/"}
          className="w-[475px] underline text-blue-500 pl-[35px] mt-12 gap-2 inline-flex"
        >
          {" "}
          <ArrowLeft /> Go to CLFS website{" "}
        </Link>
      </div>
    );
  }
  if (session?.user.role === "USER") {
    return (
      <div className="h-screen text-center">
        <h1 className="text-5xl pt-14">
          You are signed in as a User, Sign Out to access Admin
        </h1>
        <Link
          href={"/"}
          className="w-[475px] underline text-blue-500 pl-[35px] mt-12 gap-2 inline-flex"
        >
          {" "}
          <ArrowLeft /> Go to CLFS website to Sign Out
        </Link>
      </div>
    );
  }
  return (
    <main className="bg-[#ECECEC] w-full h-screen flex flex-col text-[#615C61]  items-center justify-center">
      <div className="adminlogo text-[67px] font-medium">CLFIS</div>
      <div className="bg-white w-[475px] h-[375px] px-[40px] shadow-md pt-[55px]">
        <form onSubmit={loginAdmin} className="w-full">
          <input
            type="email"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email Address"
            className="w-full border border-black rounded-[15px] placeholder:text-[#8D8D8D] mb-[47px] h-[69px] pl-[18px] "
          />
          <input
            type="password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Password"
            className="w-full border mb-[31px] border-black rounded-[15px] placeholder:text-[#8D8D8D] h-[69px] pl-[18px] "
          />
          <div className="text-[#615C61] flex justify-between ">
            <div className="flex items-center">
              <input
                type="checkbox"
                name=""
                className="w-[18px] h-[18px]"
                id=""
              />{" "}
              <span className="ml-[11px]">Remember me ?</span>
            </div>{" "}
            <button className="reportbutton text-white w-[114px] h-[49px]">
              Log In
            </button>
          </div>
        </form>
      </div>
      <Link href={"/"} className="w-[475px] pl-[35px] mt-12 gap-2 inline-flex">
        {" "}
        <ArrowLeft /> Go to CLFS website
      </Link>
    </main>
  );
};

export default AdminLogin;
