"use client";

import getDocuments from "@/actions/getDocuments";
import updateDoucmentVerificationStatus from "@/actions/updateDocumentVerificationStatus";
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
import { Document, Status, User } from "@prisma/client";
import { useEffect, useState } from "react";

export function DocumentTable() {
  const [documents, setDocuments] = useState<(Document & { user: User })[]>([]);
  async function getDocumentss() {
    const res = await getDocuments();
    if (res?.success && res?.data) {
      setDocuments(res?.data);
    }
  }

  useEffect(() => {
    getDocumentss();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>File Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Uploaded At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents?.map((document) => (
          <TableRow key={document.id}>
            <TableCell>{document.user.email}</TableCell>
            <TableCell>{document.fileName}</TableCell>
            <TableCell>
              <Select
                value={document.status}
                onValueChange={(value: Status) => {
                  updateDoucmentVerificationStatus({
                    documentId: document.id,
                    status: value,
                  });
                  setDocuments(
                    documents?.map((dcmnt) =>
                      dcmnt.id === document.id
                        ? { ...dcmnt, status: value }
                        : dcmnt
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
              {new Date(document.uploadedAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
