import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import AddCategory from "@/components/AddCategory/page";
import { deleteCategory } from "@/app/action";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";
const CategoryPage = async () => {
  const categories = await prisma?.category.findMany();
  return (
    <div className="h-screen bg-[#FCF5EF] overflow-hidden  w-full pl-[40px] z-10 ">
      <h1 className="text-[27px] font-semibold mt-[56px]">Manage Category</h1>

      <p className="text-[#8E8E8E] font-semibold mb-8 ">
        Dashboard / <span className="text-[#555555]">Manage Category</span>
      </p>
      <div className=" px-[27px] bg-white rounded-[15px] pt-[40px] flex flex-col  w-[90%]">
        <AddCategory />
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

              {categories?.map((category, index) => (
                <TableRow
                  key={category.id}
                  className="border-2 border-gray-200/30"
                >
                  <TableCell className="border border-gray-200/30">
                    {index + 1}
                  </TableCell>
                  <TableCell className="border border-gray-200/30">
                    {category.name} 
                  </TableCell>
                  <TableCell className="border border-gray-200/30 flex justify-center">
                                    <DeleteCategoryButton id={category.id}/>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryPage;
