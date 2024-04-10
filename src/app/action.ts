"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addItem(prevState: boolean, formData: FormData) {
  const category = formData.get("category");
  const name = formData.get("title");
  const tag = formData.get("tag");
  const description = formData.get("description");
  const image = formData.get("imgUrl");

  console.log(category, name, tag, description, image);
  try {
    await prisma?.item.create({
      data: {
        name: name as string,
        category: category as string,
        tag: tag as string,
        image: image as string,
        description: description as string,
      },
    });
    fetch("http://127.0.0.1:5000/send_emails", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send emails");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error sending emails:", error);
      });
    revalidatePath("/dashboard/items");
    return !prevState;
  } catch (err) {
    console.log(err);
  }
}

export async function addCategory(prevState: boolean, formData: FormData) {
  const category = formData.get("name");
  console.log(category);
  try {
    await prisma?.category.create({
      data: {
        name: category as string,
      },
    });
    revalidatePath("/dashboard/categories");
    return !prevState;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCategory(id: string) {
  console.log(id);
  try {
    await prisma?.category.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/categories");
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUser(id: string) {
  console.log(id);
  try {
    await prisma?.user.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/users");
  } catch (error) {
    console.log(error);
  }
}
export async function deleteMessage(id: string) {
  console.log(id);
  try {
    await prisma?.message.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/messages");
  } catch (error) {
    console.log(error);
  }
}
export async function deleteItem(id: string) {
  console.log(id);
  try {
    await prisma?.item.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/items");
  } catch (error) {
    console.log(error);
  }
}
