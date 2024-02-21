"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { useState,useRef } from "react";
import { UploadButton } from "@/utils/uploadthing";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useFormState } from "react-dom";
import { addItem} from "@/app/action";
const initialState = {
  message: null,
};
const AddItem = ({ categories }: any) => {  
    const formRef = useRef<HTMLFormElement>(null);
  const [imgUrl, setImgUrl] = useState("");
    const [fileName, setFileName] = useState("No file chosen");
  const handleFormSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Your form submission logic here

    // Clear form fields
     if (formRef.current) {
      formRef.current.reset();
    }
  };

  const [state, formAction] = useFormState(addItem, initialState);
  return (
    <Dialog>
      <DialogTrigger className="w-[143px] h-[42px] text-[#FFFFFF] bg-[#FE8116] font-medium text-[18px] ml-auto  rounded-lg mb-[33px]">
        Add New
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="max-w-[1024px]"
      >
        <DialogTitle>New Item Entry</DialogTitle>
        <hr className="text-[#E3E3E3] bg-[#E3E3Eh=3] w-full" />
        <form className="w-[914px] mx-auto" action={formAction}>
          <h1 className="mb-1">Category </h1>
          <div className="relative">
            <select name="category"
                        required
                            className="w-full rounded-[15px] border border-[#D9D9D9] outline-none appearance-none   p-2 mb-[24px]">
              {/* @ts-ignore */}
              <option value="" disabled selected>
                Select Category{" "}
              </option>
              {/* @ts-ignore */}
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}{" "}
            </select>

            <ChevronDown className="text-[#D9D9D9] absolute inset-y-0 right-2 top-2 " />
          </div>
          <h1 className="mb-1">Title</h1>
          <input
            type="text"
            name="title"
                        required
            className="w-full rounded-[15px] border border-[#D9D9D9] outline-none p-2 mb-[24px]"
          />
          <h1 className="mb-1">Tag</h1>
          <input
            type="text"
            name="tag"
            className="w-full rounded-[15px] border border-[#D9D9D9] outline-none p-2 mb-6"
          />
          <h1 className="mb-1">Description</h1>
          <textarea
            
            name="description"
            className="w-full rounded-[15px] border border-[#D9D9D9] outline-none p-2 h-[228px] mb-6 "
          />
                    <input  
                        type="text" name="imgUrl" className="hidden" value={imgUrl}/>
          <h1 className="mb-1">Item Image</h1>
          <div className="relative ">
            <UploadButton
     appearance={{
    button:
      "ut-ready:bg-[#D9D9D9] ut-uploading:cursor-not-allowed text-black rounded-l-[15px] rounded-r-none bg-none  after:bg-orange-400",
    container: "w-full flex-row rounded-[15px] justify-start border border-[#D9D9D9] relative",
    allowedContent:
      "flex h-8 flex-col  px-2 hidden ",
  }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImgUrl(res[0].url);
                            setFileName(res[0].name);
              }}
              onUploadError={(error) => {
                // Do something with the error.

                alert(`ERROR! ${error.message}`);
              }}
            />
                    <span className="text-[18px] absolute inset-y-0 left-40 top-2">{fileName}</span>
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <div>
              <button
                className="w-[143px] h-[42px] text-[#FFFFFF] bg-[#FE8116] rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
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

export default AddItem;
