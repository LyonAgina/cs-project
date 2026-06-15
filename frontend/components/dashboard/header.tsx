"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search opportunities..." className="pl-9" />
      </div>

      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Avatar className="cursor-pointer">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback>LA</AvatarFallback>
          </Avatar>
        </Link>

        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}