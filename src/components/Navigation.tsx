/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  async function getUserData() {
    const { data } = await supabase.auth.getUser();

    if (data?.user) setUser(data.user);
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          adaptify loop
        </Link>
        <div className="space-x-4">
          {user?.user_metadata?.role == "admin" && (
            <Link href="/admin">
              <Button variant="ghost">Admin Panel</Button>
            </Link>
          )}
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>

          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
