import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, itemTag, subject, message } = body;

    const sentMessage = await prisma.message.create({
      data: {
        name: name,
        tag: itemTag,
        subject: subject,
        message: message,
      },
    })


console.log(sentMessage)
       return NextResponse.json({message: "Successfully sent message" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { user: null, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
