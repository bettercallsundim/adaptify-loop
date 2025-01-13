"use server";
import prisma from "@/lib/db";
import { getUserServer } from "@/utils/getUser";

export interface GetDocumentChartsDataResponse {
  success: boolean;
  data: {
    approved: number;
    rejected: number;
    pending: number;
  };
}

export default async function getDocumentChartsData(): Promise<
  | GetDocumentChartsDataResponse
  | {
      success: false;
    }
> {
  const user = await getUserServer();

  if (!user?.email || user?.user_metadata?.role === "admin")
    return {
      success: false,
    };

  const documents = await prisma.document.findMany({
    include: {
      user: true,
    },
  });

  let approvedCount = 0;
  let rejectedCount = 0;
  let pendingCount = 0;

  documents.forEach((document) => {
    if (document.status === "approved") {
      approvedCount++;
    } else if (document.status === "rejected") {
      rejectedCount++;
    } else {
      pendingCount++;
    }
  });

  return {
    success: true,
    data: {
      approved: approvedCount,
      rejected: rejectedCount,
      pending: pendingCount,
    },
  };
}
