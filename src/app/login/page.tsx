"use client";
import styles from "./styles.module.css";
import React from "react";
import { useState } from "react";
import { loginbg } from "../../../assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
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
    <main className="w-full  h-screen flex  ">
      <div className="w-3/5 h-screen relative">
        <Image src={loginbg} fill={true} alt="loginbg" />
      </div>
      <div className=" mx-auto flex flex-col justify-center ">
        <div className="text-center">
          <h1 className="font-semibold text-5xl mb-2">Hello Again!</h1>
          <p className="text-2xl font-normal ">
            What have you misplaced now?😂
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
      </div>
    </main>
  );
};

export default LoginPage;
