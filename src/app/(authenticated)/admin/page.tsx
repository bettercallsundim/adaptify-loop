"use client";
import { DocumentChart } from "@/components/DocumentChart";
import { DocumentTable } from "@/components/DocumentTable";
import { PaymentChart } from "@/components/PaymentChart";
import { PaymentTable } from "@/components/PaymentTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage payments and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="payments">
            <TabsList className="grid w-full grid-cols-2 bg-slate-200">
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="payments">
              <PaymentTable />
            </TabsContent>
            <TabsContent value="documents">
              <DocumentTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <PaymentChart />
        <DocumentChart />
      </div>
    </div>
  );
}
