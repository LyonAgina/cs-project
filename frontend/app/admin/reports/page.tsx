"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  XAxis,
} from "recharts";

import { AdminLayout } from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ReportData = {
  totalUsers: number;
  totalOpportunities: number;
  totalApplications: number;
  activeOpportunities: number;
};

export default function AdminReportsPage() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<ReportData>({
    totalUsers: 0,
    totalOpportunities: 0,
    totalApplications: 0,
    activeOpportunities: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Reports fetch error:", error))
      .finally(() => setLoading(false));
  }, []);

  const overviewData = [
    {
      name: "Users",
      value: reports.totalUsers,
    },
    {
      name: "Opportunities",
      value: reports.totalOpportunities,
    },
    {
      name: "Applications",
      value: reports.totalApplications,
    },
    {
      name: "Active Listings",
      value: reports.activeOpportunities,
    },
  ];

  const opportunityData = [
    {
      name: "Active",
      value: reports.activeOpportunities,
    },
    {
      name: "Inactive",
      value: Math.max(
        reports.totalOpportunities - reports.activeOpportunities,
        0
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            View platform statistics using visual reports.
          </p>
        </div>

        {loading && <p>Loading reports...</p>}

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{reports.totalUsers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {reports.totalOpportunities}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {reports.totalApplications}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {reports.activeOpportunities}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Count",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={overviewData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opportunity Status</CardTitle>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Count",
                  },
                }}
                className="h-[300px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={opportunityData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {opportunityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}