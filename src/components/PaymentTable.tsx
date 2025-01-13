"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment, Status, User } from "@prisma/client";
import { useEffect, useState } from "react";

export function PaymentTable() {
  const [payments, setPayments] = useState<(Payment & { user: User })[]>([]);

  async function getPayments() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payments`);
    const data = await res.json();
    setPayments(data?.data);
    return data;
  }
  useEffect(() => {
    getPayments();
  }, []);

  async function updatePaymentStatus(id: number, status: Status) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );
    const data = await res.json();
    return data;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.user.email}</TableCell>
            <TableCell>{payment.title}</TableCell>
            <TableCell>${payment.amount / 100}</TableCell>
            <TableCell>
              <Select
                value={payment.status}
                onValueChange={(value: Status) => {
                  updatePaymentStatus(payment.id, value);
                  setPayments(
                    payments.map((payment) =>
                      payment.id === payment.id
                        ? { ...payment, status: value }
                        : payment
                    )
                  );
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              {new Date(payment.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
