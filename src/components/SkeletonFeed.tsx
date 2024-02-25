import React from "react";
import { Skeleton } from "./ui/skeleton";
const SkeletonCard = () => {
  return (
    <div className=" shadow-md transform  transition duration-500 ease-in-out rounded-xl relative mx-1">
      <Skeleton className=" w-[339px] h-[304px] relative  " />
    <div className="">

                <Skeleton className="bg-no-repeat rounded-t-xl" />
            </div>
      <Skeleton className="h-[137px] text-left p-2 relative" />
    </div>
  );
};
const SkeletonFeed = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[23px] ml-2 text-[#615C61]">
      {"abcdefghi".split("").map(( index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
export default SkeletonFeed;
