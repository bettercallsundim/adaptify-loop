import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (e) {
    console.log("🚀 ~ POST ~ e:", e);
  }
}
