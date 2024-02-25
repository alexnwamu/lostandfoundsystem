import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SideBar from "@/components/SideBar/page";
import AdminNavbar from "@/components/AdminNavbar/page";
export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session?.user.role);
  if (session?.user.role === "ADMIN") {
    return (
      <main>
        <div className=" z-50 w-full fixed">
          <AdminNavbar />
        </div>
        <div className="flex relative">
          <div className="fixed z-40 bg-white h-full  left-0 top-[100px]">
            <SideBar />
          </div>
        <div className="mt-[100px] relative pl-[25%] z-0 w-full">
                        {children}
{/* footer*/}
<div className="  bg-[#FCF5EF]  bottom-0 w-full  z-0 border-t border-[#808080] left-[150px] pt-[29px] pb-[48px] text-center text-[#FE8116]"> © Copyright CLFIS. All Rights Reserved
                        </div>
                    </div>
        </div>
      </main>
    );
  }

  return (
    <div className="h-screen text-center">
      <h1 className="text-5xl pt-14">You are not an admin...</h1>
      <Link
        href={"/"}
        className="w-[475px] underline text-blue-500 pl-[35px] mt-12 gap-2 inline-flex"
      >
        {" "}
        <ArrowLeft /> Go to CLFS website
      </Link>
    </div>
  );
}
