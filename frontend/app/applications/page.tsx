"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Application = {
  id: string;
  status: string;
  appliedAt: string;
  opportunityTitle: string;
  organization: string | null;
  category: string;
};

export default function ApplicationsPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
  if (!session?.user?.id) return;

  fetch(`http://localhost:3000/api/applications/${session.user.id}`)
    .then((res) => res.json())
    .then((data) => setApplications(data))
    .catch((error) => console.error("Applications fetch error:", error))
    .finally(() => setLoading(false));
}, [session?.user?.id]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Track your submitted applications.
          </p>
        </div>

        {loading && <p>Loading applications...</p>}

        <div className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-muted-foreground">
              You have not submitted any applications yet.
            </p>
          ) : (
            applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <CardTitle>{app.opportunityTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {app.organization} · {app.category}
                  </p>
                </CardHeader>

                <CardContent>
                  <p>Status: {app.status}</p>
                  <p>Applied on: {new Date(app.appliedAt).toDateString()}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}