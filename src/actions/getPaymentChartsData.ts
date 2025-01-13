"use server";
import prisma from "@/lib/db";
import { getUserServer } from "@/utils/getUser";

export interface GetPaymentChartsDataResponse {
  success: boolean;
  data: {
    approved: number;
    rejected: number;
    pending: number;
  };
}

export default async function getPaymentChartsData(): Promise<
  | GetPaymentChartsDataResponse
  | {
      success: false;
    }
> {
  const user = await getUserServer();

  if (!user?.email || user?.user_metadata?.role !== "admin")
    return {
      success: false,
    };

  const payments = await prisma.payment.findMany({
    include: {
      user: true,
    },
  });

  let approvedCount = 0;
  let rejectedCount = 0;
  let pendingCount = 0;

  payments.forEach((payment) => {
    if (payment.status === "approved") {
      approvedCount++;
    } else if (payment.status === "rejected") {
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
