"use client";

import { useEffect, useState } from "react";
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

export default function OpportunitiesPage() {
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .catch((error) => console.error("Opportunities fetch error:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-muted-foreground">
            Browse available internships, scholarships, attachments, and trainings.
          </p>
        </div>

        {loading && <p>Loading opportunities...</p>}

        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.organization} · {item.location}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm">{item.requirements}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>

                  <Button asChild>
                    <Link href={`/opportunities/${item.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}