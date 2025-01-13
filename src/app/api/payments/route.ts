import { prisma } from "@/lib/db";
import { getUserServer } from "@/utils/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserServer();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = user.user_metadata?.role === "admin";
  let payments;
  if (!isAdmin) {
    payments = await prisma.payment.findMany({
      where: {
        userId: user.email,
      },
      include: {
        user: true,
      },
    });
  } else {
    payments = await prisma.payment.findMany({
      include: {
        user: true,
      },
    });
  }

  return NextResponse.json({
    success: true,
    data: payments,
  });
}

export async function POST(req: Request) {
  try {
    const { title, amount } = await req.json();

    const user = await getUserServer();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payment = await prisma.payment.create({
      data: {
        title,
        amount,
        userId: user.email,
      },
    });

    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json({ error: "Internal server error" });
  }
}
