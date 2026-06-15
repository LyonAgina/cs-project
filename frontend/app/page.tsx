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

type DashboardData = {
  recommendedCount: number;
  applicationsCount: number;
  profileMatch: number;
  topOpportunities: Opportunity[];
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    recommendedCount: 0,
    applicationsCount: 0,
    profileMatch: 0,
    topOpportunities: [],
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Dashboard fetch error:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Here are your latest recommended opportunities.
          </p>
        </div>

        {loading && <p>Loading dashboard...</p>}

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recommended</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.recommendedCount}</p>
              <p className="text-sm text-muted-foreground">Available matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.applicationsCount}</p>
              <p className="text-sm text-muted-foreground">Submitted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Match</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.profileMatch}%</p>
              <p className="text-sm text-muted-foreground">Profile strength</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Opportunities</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {data.topOpportunities.length === 0 ? (
              <p className="text-muted-foreground">
                No opportunities available yet.
              </p>
            ) : (
              data.topOpportunities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.organization} · {item.location}
                    </p>
                  </div>

                  <Button asChild>
                    <Link href={`/opportunities/${item.id}`}>View</Link>
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}