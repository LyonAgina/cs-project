"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Opportunity = {
  id: string;
  title: string;
  category: string;
  organization: string | null;
  location: string | null;
  requirements: string | null;
  deadline: string | null;
  status: string;
};

export default function OpportunityDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = authClient.useSession();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/opportunities/${id}`)
      .then((res) => res.json())
      .then((data) => setOpportunity(data))
      .catch((error) =>
        console.error("Opportunity details fetch error:", error)
      );
  }, [id]);

  async function handleApply() {
    if (!session?.user?.id || !opportunity?.id) {
      alert("You must be logged in to apply.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: session.user.id,
        opportunityId: opportunity.id,
      }),
    });

    if (response.ok) {
      alert("Application submitted successfully!");
    } else {
      alert("Failed to submit application.");
    }
  }

  if (!opportunity) {
    return (
      <DashboardLayout>
        <p>Loading opportunity...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{opportunity.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {opportunity.organization} · {opportunity.location}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <p>
              <strong>Category:</strong> {opportunity.category}
            </p>

            <p>
              <strong>Status:</strong> {opportunity.status}
            </p>

            <p>
              <strong>Deadline:</strong>{" "}
              {opportunity.deadline
                ? new Date(opportunity.deadline).toDateString()
                : "No deadline"}
            </p>

            <div>
              <strong>Requirements:</strong>
              <p className="mt-2 text-muted-foreground">
                {opportunity.requirements}
              </p>
            </div>

            <Button onClick={handleApply}>Apply Now</Button>
          </CardContent>
        </Card>
        <Button variant="outline" asChild>
          <Link href="/opportunities">Back to Opportunities</Link>
        </Button>
      </div>
    </DashboardLayout>
  );
}