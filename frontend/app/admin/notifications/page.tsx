import { AdminLayout } from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminNotificationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Send updates and announcements to users.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            Notification management tools will appear here.
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}