import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecommendationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Recommendations</h1>
          <p className="text-muted-foreground">
            Personalized opportunities based on your profile will appear here.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            Match scores and recommended opportunities will be generated here.
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}