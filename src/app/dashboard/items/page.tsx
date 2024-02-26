import React from "react";

import prisma from "@/lib/db";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import AddItem from "@/components/AddItem";
import ViewItem from "@/components/ViewItem";
const Items = async () => {
  const items = await prisma?.item.findMany();
  const categories = await prisma?.category.findMany();
  return (
    <div className="h-full bg-[#FCF5EF] py-[40px]   w-full pl-[40px] z-10 ">
      <h1 className="text-[27px] font-semibold mt-[56px]">Manage Item</h1>
      <p className="text-[#8E8E8E] font-semibold mb-8 ">
        Dashboard / <span className="text-[#555555]">Manage Item</span>
      </p>
      <div className=" px-[27px] bg-white rounded-[15px] py-[40px] mb-[40px] flex flex-col  w-[90%]">
        <AddItem categories={categories} />

        <hr className="text-[#E3E3E3] bg-[#E3E3E3]" />
        <Table className="min-w-[500px] text-[18px]">
          <TableHeader className="font-medium">
            <TableRow>
              <TableHead className="border border-gray-200/30 text-black">
                #
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
            {items?.map((item, index) => (
              <TableRow key={item.id} className="border-2 border-gray-200/30">
                <TableCell className="border border-gray-200/30">
                  {index + 1}
                </TableCell>
                <TableCell className="border border-gray-200/30">
                  {item.name}
                </TableCell>
                <TableCell className="border border-gray-200/30 flex justify-center">
                  <ViewItem item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Items;
