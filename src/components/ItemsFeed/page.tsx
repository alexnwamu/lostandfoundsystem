import React from "react";
import Image, { StaticImageData } from "next/image";
import { format } from "date-fns";
import "../../app/globals.css";
import { loginbg } from "../../../assets";
interface Props {
  itemData: itemData[];
    activeCategory : string | null
}

interface itemData {
  name: string;
  tag: string | null;
  description: string | null;
  createdAt: Date;
  image: string;
  category: string;
}
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

//TODO Add props Data for Items Data
// const handleCategoryChange = (category: string) => {
//    setSelectedCategory(category);
//  };
//
//  // Filter cards based on selected category
const ItemsFeed = ({ itemData, activeCategory }: Props) => {
  const filteredItems =
    activeCategory === "All"
      ? itemData
      : itemData.filter((item) => item.category === activeCategory);
  if (filteredItems.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[23px] ml-2 text-[#615C61]">
        {filteredItems.map((item, index) => (
          <Dialog key={index}>
            <DialogTrigger className=" shadow-md transform  transition duration-500 ease-in-out rounded-xl relative mx-1">
              <div className=" w-[339px] h-[304px] relative  ">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="bg-no-repeat rounded-t-xl"
                  fill={true}
                />
              </div>
              <div className="h-[137px] text-left p-2 relative">
                <h3 className="font-bold mb-[22px]">
                  Found Item:{" "}
                  <span className="font-normal  ml-[10px]">{item.name}</span>
                </h3>
                <h3 className="font-bold mb-[22px]">
                  Tag: <span className="font-normal ml-[10px]">{item.tag}</span>
                </h3>
                <h3 className="font-bold">
                  Date:{" "}
                  <span className="font-normal ml-[10px]">
                    {format(item.createdAt, "yyyy-MM-dd")}
                  </span>
                </h3>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[1110px] ">
              <h1 className="text-[#615C61] text-[66px] font-semibold text-center">
                {item.name}{" "}
              </h1>
              <hr />
              <div className="mt-[105px] flex gap-[66px]">
                <div className=" w-[545px] h-[463px] relative rounded-xl ">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="bg-no-repeat rounded-xl"
                    fill={true}
                  />
                </div>
                <div className="text-[#615C61] text-[14px] ">
                  <h2>
                    Found Date:{" "}
                    <span className="ml-1">
                      {format(item.createdAt, "yyyy-MM-dd")}
                    </span>
                  </h2>
                  <h2>
                    Item Tag: <span className="ml-1">{item.tag}</span>
                  </h2>
                  <h2>Item Description: <span className="ml-1">{item.description}</span></h2>
                </div>
              </div>
              <div className="mt-[85px] w-full flex">
                <Link
                  className="  ml-auto mr-[158px] "
                  href={{ pathname: "/contact", query: { tag: item.tag } }}
                >
                  <button className="reportbutton text-white w-[124px] h-[44px]  text-[12px] ">
                    Claim
                  </button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    );
  } else {
    return <div className="font-bold">No Items available</div>;
  }
};

export default ItemsFeed;
