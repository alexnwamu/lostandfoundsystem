import React from "react";
import { format } from "date-fns/format";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/db";
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
import DeleteUserButton from "@/components/DeleteUserButton";
const UserPage = async () => {
  const session = await getServerSession(authOptions);
  const users = await prisma?.user.findMany();
  return (
    <div className="h-screen bg-[#FCF5EF] overflow-hidden  w-full pl-[40px]  z-10 ">
      <h1 className="text-[27px] font-semibold mt-[56px]"> User List</h1>
      <p className="text-[#8E8E8E] font-semibold mb-8 ">
        Dashboard / <span className="text-[#555555]">User List</span>
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
                Avatar
              </TableHead>
              <TableHead className="border border-gray-200/30 text-black">
                Name
              </TableHead>
              <TableHead className="border border-gray-200/30 text-black text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={user.id} className="border-2 border-gray-200/30">
                <TableCell className="border border-gray-200/30">
                  {index + 1}
                </TableCell>
                <TableCell>
                  {format(user.createdAt, "dd-MM-yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        session?.user?.image ||
                        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="border border-gray-200/30">
                  {user.name}
                </TableCell>
                <TableCell className="border border-gray-200/30 flex justify-center">
<DeleteUserButton id={user.id}/>
                                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserPage;
