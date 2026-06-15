import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  BarChart3,
  Bell,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-background px-4 py-6">
      <h1 className="mb-8 text-xl font-bold">Admin Dashboard</h1>

      <nav className="space-y-2">
        <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        <Link href="/admin/opportunities" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
          <Briefcase className="h-4 w-4" />
          Opportunities
        </Link>

        <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
          <Users className="h-4 w-4" />
          Users
        </Link>

        <Link href="/admin/applications" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
          <FileText className="h-4 w-4" />
          Applications
        </Link>

        <Link href="/admin/reports" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
          <BarChart3 className="h-4 w-4" />
          Reports
        </Link>

        <Link href="/admin/notifications" className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
          <Bell className="h-4 w-4" />
          Notifications
        </Link>
      </nav>
    </aside>
  );
}