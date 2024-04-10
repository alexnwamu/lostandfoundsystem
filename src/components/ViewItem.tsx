"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { deleteItem } from "@/app/action"; 
interface Message {
  id: string;
  name: string;
  createdAt: Date;
  tag: string | null;
  message: string;
  subject: string | null;
}
import { useTransition } from "react";
import Image from "next/image";
const ViewItem = ({ item }: any) => {
  let [isPending, startTransition] = useTransition();
  return (
    <Dialog>
      <DialogTrigger className="text-[#05FF00] text-[18px]">View</DialogTrigger>
      <DialogContent className="max-w-[1024px] p-[32px] flex flex-col text-[#615C61] max-h-[80%] overflow-y-auto">
        <DialogTitle className="font-semibold text-[61px] text-center ">
          {item.name}{" "}
        </DialogTitle>
        <hr className="text-[#615C6169] w-full" />
        <div className="flex  gap-9 mt-[64px]">
          <div className="w-[507px] h-[431px] relative rounded-[20px]">
            <Image
              src={item.image}
              alt="image"
              layout="fill"
              className="rounded-[21px]"
            />
          </div>
          <div>
            <h3 className="font-bold mb-[22px]">
              Item Tag:{" "}
              <span className="font-normal ml-[10px]">{item.tag}</span>
            </h3>
            <h3 className="font-bold mb-[22px]">
              Category:{" "}
              <span className="font-normal  ml-[10px]">{item.category}</span>
            </h3>
            <h3 className="font-bold mb-[22px]">
              Item Description:{" "}
              <span className="font-normal  ml-[10px]">{item.description}</span>
            </h3>
            <h3 className="font-bold">
              Found Date:{" "}
              <span className="font-normal ml-[10px]">
                {format(item.createdAt, "EEEE do MMMM',' yyyy")}
              </span>
            </h3>
          </div>
        </div>

        <button
          onClick={() => startTransition(() => deleteItem(item.id))}
          className="text-white bg-[#FE8116] w-[143px] h-[42px] rounded-[8px] mt-[50px]"
        >
          delete
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewItem;
