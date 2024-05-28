/* eslint-disable react/no-unescaped-entities */
"use client";
import styles from "./styles.module.css";
import React from "react";
import { useState } from "react";
import { loginbg } from "../../../assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
      router.push("/");
    }
  };

  return (
    <main className="w-full  h-screen flex  bg-transparent " suppressHydrationWarning>
      <div className="w-[50%]">
        <div className="w-full h-[90%] relative">
          <Image src={loginbg} fill={true} alt="loginbg" />
        </div>
        <div className="bg-gray-800 h-[10%]"></div>
      </div>

      <div className=" rounded-l-[42px] w-[50%] bg-white  flex flex-col -ml-[30px] z-50 justify-center">
        <div className="text-center">
          <h1 className="font-semibold text-5xl mb-2">Hello Again!</h1>
          <p className="text-2xl font-normal ">
            Nice to see you, please login with your account
          </p>
        </div>
        <form
          onSubmit={loginUser}
          className="w-[489px] mx-auto flex flex-col gap-10 mt-4"
        >
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            placeholder="Email"
            className="w-full border border-black  rounded-lg p-2 h-[85px] placeholder:text-[22px] placeholder:text-[background: #8D8D8D]"
          />

          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            placeholder="Password"
            className="w-full border border-black  rounded-lg p-2 h-[85px] placeholder:text-[22px] placeholder:text-[background: #8D8D8D]"
          />

          <button className={styles.registerbutton}>Log In</button>
        </form>
        <Link href="/register">
          <div className="text-center text-[#8D8D8D] mt-4">
            Don't have an account? {" "}
            <span className="text-[#0000FF]">Sign Up</span>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
