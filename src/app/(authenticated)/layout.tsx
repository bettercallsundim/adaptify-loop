import { Navigation } from "@/components/Navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
