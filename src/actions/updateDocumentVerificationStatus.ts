"use server";
import prisma from "@/lib/db";
import { getUserServer } from "@/utils/getUser";
import { Status } from "@prisma/client";

export default async function uploadVerification({
  documentId,
  status,
}: {
  documentId: string;
  status: Status;
}) {
  const user = await getUserServer();

  if (!user?.email)
    return {
      success: false,
    };

  await prisma.document.update({
    where: {
      id: +documentId,
      userId: user.email,
    },
    data: {
      userId: user.email,
      status,
    },
  });

  return {
    success: true,
  };
}
