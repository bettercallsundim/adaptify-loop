"use client";

import getDocuments from "@/actions/getDocuments";
import { makeStripePayment } from "@/actions/makeStripePayment";
import { NewPaymentDialog } from "@/components/NewPayment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadVerification } from "@/components/UploadVerification";
import { Document, Payment } from "@prisma/client";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [refetchPayments, setRefetchPayments] = useState(0);
  const [refetchDocuments, setRefetchDocuments] = useState(0);

  async function getDocumentss() {
    const res = await getDocuments();
    if (res?.success && res?.data) {
      setDocuments(res?.data);
    }
  }

  async function getPayments() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payments`);
    const data = await res.json();
    setPayments(data?.data);
    return data;
  }

  useEffect(() => {
    getPayments();
  }, [refetchPayments]);

  useEffect(() => {
    getDocumentss();
  }, [refetchDocuments]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex items-center gap-x-5">
        <NewPaymentDialog setRefetch={setRefetchPayments} />
        <UploadVerification setRefetchDocuments={setRefetchDocuments} />
      </div>

      <h1 className="text-2xl font-bold mb-4 mt-12">Payments</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {payments?.map((payment) => (
          <Card key={payment?.id}>
            <CardHeader>
              <CardTitle>{payment?.title}</CardTitle>
              <CardDescription>Amount: ${payment?.amount}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Status: {payment?.status}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Created at: {new Date(payment?.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => {
                  makeStripePayment({
                    title: payment.title,
                    price: payment.amount,
                  });
                }}
              >
                <img
                  src="/stripe.png"
                  alt="download"
                  className="w-[100px] h-6 object-cover rounded-md"
                />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {payments?.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No payments found.</p>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4 mt-12">Documents</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents?.map((document) => (
          <Card key={document?.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span>{document?.fileName}</span>
                <a href={document?.fileUrl} target="_blank">
                  <Download />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <p>Status: {document?.status}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Uploaded at: {new Date(document?.uploadedAt).toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {documents?.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No documents found.</p>
        </div>
      )}
    </div>
  );
}
