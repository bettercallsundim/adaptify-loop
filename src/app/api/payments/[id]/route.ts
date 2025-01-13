import { prisma } from "@/lib/db";
import { getUserServer } from "@/utils/getUser";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const id = (await params)?.id;

    const user = await getUserServer();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = user.user_metadata?.role === "admin";
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await request.json();

    const payment = await prisma.payment.update({
      where: {
        id: +id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
