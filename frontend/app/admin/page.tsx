import { AdminLayout } from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, opportunities, applications, reports, and notifications.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}