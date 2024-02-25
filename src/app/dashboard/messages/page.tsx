import React from "react";
import { format } from "date-fns/format";
import prisma from "@/lib/db";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ViewMessage from "@/components/ViewMessage";
const MessagesPage = async () => {
  const session = await getServerSession(authOptions);
  const messages = await prisma?.message.findMany();
  return (
    <div className="h-screen bg-[#FCF5EF] overflow-hidden  w-full pl-[40px] z-10 ">
      <h1 className="text-[27px] font-semibold mt-[56px]"> Inquires</h1>
      <p className="text-[#8E8E8E] font-semibold mb-8 ">
        Dashboard / <span className="text-[#555555]">Inquires</span>
      </p>

      <div className=" px-[27px] bg-white rounded-[15px] py-[40px] flex flex-col  w-[90%]">
        <hr className="text-[#E3E3E3] bg-[#E3E3E3]" />
        <Table className="min-w-[500px] text-[18px]">
          <TableHeader className="font-medium">
            <TableRow>
              <TableHead className="border border-gray-200/30 text-black">
                #
              </TableHead>

              <TableHead className="border border-gray-200/30 text-black">
                Date Created
              </TableHead>
              <TableHead className="border border-gray-200/30 text-black">
                Name
              </TableHead>
              <TableHead className="border border-gray-200/30 text-black">
                Tag
              </TableHead>
              <TableHead className="border border-gray-200/30 text-black text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages?.map((message, index) => (
              <TableRow
                key={message.id}
                className="border-2 border-gray-200/30"
              >
                <TableCell className="border border-gray-200/30">
                  {index + 1}
                </TableCell>
                <TableCell>
                  {format(message.createdAt, "dd-MM-yyyy HH:mm")}
                </TableCell>

                <TableCell className="border border-gray-200/30">
                  {message.name}
                </TableCell>

                <TableCell>
                           {message.tag === 'Tag (You cant edit this its only for claiming items)' ? 'None' : `#${message.tag}`}      
                                </TableCell>
                <TableCell className="border border-gray-200/30 flex justify-center">
                  <ViewMessage message={message} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MessagesPage;
