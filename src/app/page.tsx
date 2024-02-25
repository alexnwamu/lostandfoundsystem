"use client";
import React from "react";
import ItemsFeed from "../components/ItemsFeed/page";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SkeletonFeed from "@/components/SkeletonFeed";

interface itemData {
  name: string;
  tag: string | null;
  description: string | null;
  createdAt: Date;
  image: string;
  category: string;
}
export default function Home() {
    
  const [items, setItems] = useState<itemData[]>([]);
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await fetch("/api/itemsandcategories");
        const data = await response.json();

        // Update state with the received data
        setItems(data.items);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  const { isPending, error } = useQuery({
    queryKey: ["items"],
    queryFn: fetchData,
  });
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    // Perform search action with the search term
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return filteredData;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  if (session) {
    return (
      <main className="w-full text-[#615C61]  flex flex-col">
        <div className="text-center mt-[63px]">
          {" "}
          <h1 className="text-[26px] font-medium  text-[#615C61] ">
            Lost and Found
          </h1>
          <p className="text-[#615C61] ">We Help You Find Your Lost Items</p>
        </div>
        <div className=" mb-[70px] mx-auto">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            className="h-12 mx-auto p-3 mt-[45px] rounded-2xl bg-[#615C61] bg-opacity-5 w-[1124px] "
            placeholder="Search.."
            name=""
            onKeyPress={handleKeyPress}
            id=""
          />
        </div>
        <div className=" mx-auto ">
          <div className="max-w-[1124px]">
            <p className="mb-[13px] ">Browse Our latest Reports</p>
   {   isPending ? <SkeletonFeed/> :      <ItemsFeed itemData={handleSearch()} activeCategory={"All"} />}
          </div>
          <Link
            href={"/reports"}
            className="w-full flex items-center justify-center mt-[69px] mb-[272px] "
          >
            <button className="reportbutton px-[31px] py-[18px] text-[white] text-[15px] ">
              All Reports&gt;&gt;{" "}
            </button>
          </Link>
        </div>
      </main>
    );
  }
  return <div className="text-center mt-4 h-screen">You must be signed in</div>;
}
