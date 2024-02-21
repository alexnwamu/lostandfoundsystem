'use client'
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { deleteMessage } from "@/app/action";
interface Message {
  id: string;
  name: string;
  createdAt: Date;
  tag: string | null;
  message: string;
  subject: string | null;
}
import { useTransition } from "react";
const ViewMessage = ({ message }: any) => {
  let [isPending, startTransition] = useTransition();
  return (
    <Dialog>
      <DialogTrigger className="text-[#05FF00] text-[18px]">View</DialogTrigger>
      <DialogContent className="max-w-[1028px] flex flex-col ">
        <DialogTitle className="font-semibold ">View Inquires</DialogTitle>
        <div className="mt-[49px]">
          <h1 className="text-[25px] font-semibold">
            {message.name}
            <span className="text-[#B6B6B6]">
              {message.tag ===
              "Tag (You cant edit this its only for claiming items)"
                ? ""
                : `(#${message.tag})`}
            </span>
          </h1>
        <p className="text-[18px] font-normal">{message.message}</p>
        <p className="text-[#B6B6B6] italic mt-[27px] "> Reported on {format(message.createdAt, "EEEE do MMMM',' yyyy")}</p>
        </div>

<button 
      onClick={() => startTransition(() => deleteMessage(message.id))}
                    className="text-white bg-[#FE8116] w-[143px] h-[42px] rounded-[8px] mt-[50px]">delete</button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMessage;
