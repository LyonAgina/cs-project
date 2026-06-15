import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Updates about applications and new opportunities will appear here.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No Notifications Yet</CardTitle>
          </CardHeader>
          <CardContent>
            You will receive notifications when new matching opportunities are available.
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}