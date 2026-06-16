import Link from "next/link";
import {
  Home,
  Briefcase,
  FileText,
  User,
  Star,
  Bell,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-background px-4 py-6">
      <h1 className="mb-8 text-xl font-bold">Opportunity App</h1>

      <nav className="space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/opportunities"
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <Briefcase className="h-4 w-4" />
          Opportunities
        </Link>

        <Link
          href="/applications"
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <FileText className="h-4 w-4" />
          Applications
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link 
          href="/recommendations" 
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
            <Star className="h-4 w-4" />
            Recommendations
        </Link>
        <Link 
          href="/notifications" 
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
            <Bell className="h-4 w-4" />
            Notifications
        </Link>
      </nav>
    </aside>
  );
}