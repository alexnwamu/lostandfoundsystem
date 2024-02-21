"use client";
import "../../app/globals.css";
import React from "react";
import UserAccountNav from "../UserAccountNav/page";
const AdminNavbar = () => {
  return (
    <nav className="flex   justify-between items-center bg-white h-[102px] z-50 shadow-xl">
      <div className="adminlogo text-[48px] font-medium ml-[50px]">CLFIS</div>

      <div className="mr-[22px]">
        <UserAccountNav />
      </div>
    </nav>
  );
};

export default AdminNavbar;
