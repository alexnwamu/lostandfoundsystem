"use client";
import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import { loginbg } from "../../../assets";
type Props = {};
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
const RegisterPage = (props: Props) => {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { toast } = useToast();
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/login");
    } else if (res.status === 409) {
      toast({
        title: "Email already exists",
        description: "Please login to continue",
        variant: "destructive",
      });
    } else if (res.status === 400) {
      toast({
        title: "Please enter all fields",
        description: "All fields are required",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <main className="w-full  h-screen flex  ">
      <div className="w-3/5 h-screen relative">
        {" "}
        <Image src={loginbg} fill={true} alt="loginbg" />
      </div>
      <div className=" mx-auto flex flex-col justify-center ">
        <div className="text-center">
          <h1 className="font-semibold text-5xl mb-2">Hello Again!</h1>
          <p className="text-2xl font-normal ">
            Nice to see you, please register
          </p>
        </div>
        <form
          onSubmit={registerUser}
          className="w-[489px] mx-auto flex flex-col gap-10 mt-4"
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full border border-black  rounded-lg p-2 h-[85px] placeholder:text-[22px] placeholder:text-[background: #8D8D8D]"
          />
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

          <button className={styles.registerbutton}>Register</button>
                    <p>Already have an account? <Link href="/login" className="text-[#fe8116]">Login</Link></p>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
