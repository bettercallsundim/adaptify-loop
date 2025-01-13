"use server";
import prisma from "@/lib/db";
import { getUserServer } from "@/utils/getUser";

export default async function getDocuments() {
  const user = await getUserServer();

  if (!user?.email)
    return {
      success: false,
    };

  let documents;

  if (user?.user_metadata?.role === "admin") {
    documents = await prisma.document.findMany({
      include: {
        user: true,
      },
    });
  } else {
    documents = await prisma.document.findMany({
      where: {
        userId: user.email,
      },
      include: {
        user: true,
      },
    });
  }
  console.log("🚀 ~ getDocuments ~ documents:", documents);

  return {
    success: true,
    data: documents,
  };
}
