"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function AdminOpportunitiesPage() {
  const { data: session } = authClient.useSession();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [deadline, setDeadline] = useState("");

  function fetchOpportunities() {
    fetch("http://localhost:3000/api/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .catch((error) => console.error("Admin opportunities error:", error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function handleCreateOpportunity() {
    if (!session?.user?.id) {
      alert("You must be logged in as admin.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/opportunities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId: session.user.id,
        title,
        category,
        organization,
        location,
        requirements,
        deadline,
      }),
    });

    if (response.ok) {
      alert("Opportunity created successfully.");

      setTitle("");
      setCategory("");
      setOrganization("");
      setLocation("");
      setRequirements("");
      setDeadline("");

      fetchOpportunities();
    } else {
      alert("Failed to create opportunity.");
    }
  }

  async function handleDeleteOpportunity(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this opportunity?");

    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3000/api/opportunities/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Opportunity deleted successfully.");
      fetchOpportunities();
    } else {
      alert("Failed to delete opportunity.");
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Opportunities</h1>
          <p className="text-muted-foreground">
            Create, view, and delete opportunities.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Opportunity</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Category e.g. Internship"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Input
              placeholder="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />

            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Input
              placeholder="Requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="md:col-span-2"
            />

            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <div className="md:col-span-2">
              <Button onClick={handleCreateOpportunity}>
                Create Opportunity
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Opportunities</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loading && <p>Loading opportunities...</p>}

            {opportunities.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.organization} · {item.location} · {item.category}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => handleDeleteOpportunity(item.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}