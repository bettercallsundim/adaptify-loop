"use server";
import prisma from "@/lib/db";
import { getUserServer } from "@/utils/getUser";
import { Status } from "@prisma/client";

export default async function updateDoucmentVerificationStatus({
  documentId,
  status,
}: {
  documentId: number;
  status: Status;
}): Promise<{ success: boolean }> {
  try {
    const user = await getUserServer();

    if (!user?.email)
      return {
        success: false,
      };
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return {
      success: false,
    };
  }
}
