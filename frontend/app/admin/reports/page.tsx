import { AdminLayout } from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            View platform statistics and generated reports.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            Reports and analytics will appear here.
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}