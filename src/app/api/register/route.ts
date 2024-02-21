import bcrypt from "bcrypt";

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body
        if (!name || !email || !password) {
            return NextResponse.json("Missing name,email or Password", { status: 400 });
        }
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (userExists) {
            return NextResponse.json({user: null, message:"User already exists"}, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        });
        const {hashedPassword:newhashedPassword , ...rest}= user
        console.log(body);
        return NextResponse.json({user: rest, message:"User created successfully"}, { status: 200} );
        
    } catch (error) {
       return NextResponse.json({user: null, message:"Internal Server Error"}, { status: 500}); 
    }
}
