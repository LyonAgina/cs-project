"use client";

import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type DashboardStats = {
  totalUsers: number;
  totalOpportunities: number;
  totalApplications: number;
  activeOpportunities: number;
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOpportunities: 0,
    totalApplications: 0,
    activeOpportunities: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/reports")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) =>
        console.error("Dashboard stats fetch error:", error)
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, opportunities, applications, reports, and notifications.
          </p>
        </div>

        {loading && <p>Loading dashboard...</p>}

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {stats.totalOpportunities}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {stats.totalApplications}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {stats.activeOpportunities}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}