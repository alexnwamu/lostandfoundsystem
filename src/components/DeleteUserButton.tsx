"use client";
import React from "react";

import { useTransition } from "react";
import { deleteUser } from "@/app/action";
const DeleteUserButton = ({id}: any) => {
  let [isPending, startTransition] = useTransition();
  return (
    <button
      className="text-red-500  cursor-pointer  hover:underline"
      onClick={() => startTransition(() => deleteUser(id))}
    >
      Delete User
    </button>
  );
};

export default DeleteUserButton;
