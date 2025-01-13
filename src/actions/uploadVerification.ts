"use server";
import prisma from "@/lib/db";
import { getUserServer } from "@/utils/getUser";

export default async function uploadVerification({
  fileName,
  fileUrl,
}: {
  fileName: string;
  fileUrl: string;
}) {
  try {
    const user = await getUserServer();

    if (!user?.email)
      return {
        success: false,
      };

    await prisma.document.create({
      data: {
        userId: user.email,
        fileUrl,
        fileName,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading verification document:", error.message);
    }
  }
}
