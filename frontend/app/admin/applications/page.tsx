"use client";

import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AdminApplication = {
  id: string;
  status: string;
  appliedAt: string;
  studentName: string;
  studentEmail: string;
  opportunityTitle: string;
  organization: string | null;
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchApplications() {
    setLoading(true);

    fetch("http://localhost:3000/api/admin/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Admin applications fetch error:", error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  async function updateStatus(id: string, status: string) {
    const response = await fetch(
      `http://localhost:3000/api/applications/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (response.ok) {
      fetchApplications();
    } else {
      alert("Failed to update application status.");
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Review and manage submitted applications.
          </p>
        </div>

        {loading && <p>Loading applications...</p>}

        <div className="space-y-4">
          {!loading && applications.length === 0 ? (
            <p className="text-muted-foreground">
              No applications have been submitted yet.
            </p>
          ) : (
            applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <CardTitle>{app.opportunityTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {app.organization} · Applied by {app.studentName}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p>Email: {app.studentEmail}</p>
                  <p>Status: {app.status}</p>
                  <p>
                    Applied on: {new Date(app.appliedAt).toDateString()}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => updateStatus(app.id, "reviewing")}
                    >
                      Reviewing
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => updateStatus(app.id, "accepted")}
                    >
                      Accept
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => updateStatus(app.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}