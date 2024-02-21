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
        <div>
          <AdminNavbar />
        </div>
        <div className="flex">
          <div>
            <SideBar />
          </div>
          {children}
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
