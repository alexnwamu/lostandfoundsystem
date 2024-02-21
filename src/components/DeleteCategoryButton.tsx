"use client";
import React from "react";

import { useTransition } from "react";
import { deleteCategory } from "@/app/action";
const DeleteCategoryButton = ({id}: any) => {
  let [isPending, startTransition] = useTransition();
  return (
    <button
      className="text-red-500  cursor-pointer  hover:underline"
      onClick={() => startTransition(() => deleteCategory(id))}
    >
      Delete
    </button>
  );
};

export default DeleteCategoryButton;
