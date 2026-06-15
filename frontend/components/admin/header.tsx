"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/signin"),
      },
    });
  }

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h2 className="text-lg font-semibold">Admin Panel</h2>

      <Button variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}