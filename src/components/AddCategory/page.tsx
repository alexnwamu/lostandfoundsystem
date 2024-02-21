"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useFormState } from "react-dom";
import { addCategory } from "@/app/action";
const initialState = {
  message: null,
};
const AddCategory = () => {
    // @ts-ignore
  const [state, formAction] = useFormState(addCategory, initialState);
  return (
    <Dialog>
            <DialogTrigger className="w-[143px] h-[42px] text-[#FFFFFF] bg-[#FE8116] font-medium text-[18px] ml-auto  rounded-lg mb-[33px]">
        Add New
      </DialogTrigger>
      <DialogContent className="max-w-[1024px]">
        <DialogTitle>New Category Entry</DialogTitle>
        <hr className="text-[#E3E3E3] bg-[#E3E3Eh=3] w-full" />
        <form className="w-[914px] mx-auto" action={formAction}>
          <h1 className="mb-3">Category</h1>
          <input
            type="text"
            name="name"
            className="w-full rounded-[15px] border border-[#D9D9D9] outline-none p-2 mb-[55px]"
          />
          <div className="flex justify-center items-center gap-4">

                
            <DialogClose asChild>
            <button
              className="w-[143px] h-[42px] text-[#FFFFFF] bg-[#FE8116] rounded-lg"
              type="submit"
            >
              Save
            </button>
            </DialogClose>
            <DialogClose asChild>
              <button className="w-[143px] h-[42px] text-[#FFF] bg-[#D6D3D0] rounded-lg">
                Cancel
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
