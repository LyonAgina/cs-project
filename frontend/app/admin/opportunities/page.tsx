import { AdminLayout } from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOpportunitiesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Opportunities</h1>
          <p className="text-muted-foreground">
            Create, edit, and delete opportunities.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            Opportunity management tools will appear here.
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}