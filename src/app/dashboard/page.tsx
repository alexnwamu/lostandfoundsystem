import Image from "next/image";
import React from "react";
import { categoryIcon, itemsIcon, messsagesIcon, usersIcon } from "../../../assets";

import prisma from "@/lib/db";
const Dashboard = async () => {
  const noOfUsers = await prisma?.user.count();
  const noOfItems = await prisma?.item.count();
  const noOfCategories = await prisma?.category.count();
  const noOfMessages = await prisma?.message.count();
  return (
    <div className="h-screen bg-[#FCF5EF] overflow-hidden  w-full pl-[40px] z-10 ">
      <h1 className="text-[27px] font-semibold mt-[56px]">Home</h1>
      <p className="text-[#8E8E8E] font-semibold mb-8 ">Dashboard</p>
      <div className="flex gap-[2.2%] ">
        <div className="p-[25px] rounded-[15px] bg-white w-[508px] shadow-lg h-[207px]">
          <h2 className="mb-[31px]">Categories</h2>
          <div className="flex justify-between">
            {" "}
            <Image src={categoryIcon} width={77} height={77} alt="Logo" />
            <span className="text-[37px] font-semibold">{noOfCategories}</span>
          </div>
        </div>
        <div className="p-[25px] rounded-[15px] bg-white w-[508px] shadow-lg h-[207px]">
          <h2 className="mb-[31px]">Users</h2>
          <div className="flex justify-between">
            {" "}
            <Image src={usersIcon} width={77} height={77} alt="Logo" />
            <span className="text-[37px] font-semibold">{noOfUsers}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-[2.2%] mt-[50px]">
        <div className="p-[25px] rounded-[15px] bg-white w-[508px]  shadow-lg  h-[207px]">
          <h2 className="mb-[31px]">Items</h2>
          <div className="flex justify-between">
            {" "}
            <Image src={itemsIcon} width={77} height={77} alt="Logo" />
            <span className="text-[37px] font-semibold">{noOfItems}</span>
          </div>
        </div>
        <div className="p-[25px] rounded-[15px] bg-white w-[508px] h-[207px] shadow-lg">
          <h2 className="mb-[31px]">Messages</h2>
          <div className="flex justify-between">
            {" "}
            <Image src={messsagesIcon} width={77} height={77} alt="Logo" />
            <span className="text-[37px] font-semibold">{noOfMessages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
