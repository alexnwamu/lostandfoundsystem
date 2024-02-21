"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserAccountNav from "../UserAccountNav/page";
const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav
      className={`${pathname === "/login" || pathname === "/register" || pathname === '/admin' || pathname.includes('dashboard') ? "hidden" : "h-[94px] border border-b border-[#615C61] border-opacity-20 w-full justify-between flex items-center px-[130px]"}`}
    >
      <div id="logo" className="text-[#615C61]  text-[30px] font-medium">
        CLFIS
      </div>

      <nav className="flex gap-[25px] ">
        <Link href="/" className={pathname === "/" ? "text-[#FE8116]" : ""}>
          Home
        </Link>
        <Link
          href="/reports"
          className={pathname === "/reports" ? "text-[#FE8116]" : ""}
        >
          Reports
        </Link>
        <Link
          href="/about"
          className={pathname === "/about" ? "text-[#FE8116]" : ""}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className={pathname === "/contact" ? "text-[#FE8116]" : ""}
        >
          Contact Us
        </Link>
      </nav>

      <div>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href="/login">
            <button className="bg-[#FE8116] rounded-xl p-2 font-medium ">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
