"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    if (!session?.user?.id) return;

    fetch(`http://localhost:3000/api/profile/${session.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQualification(data?.qualification ?? "");
        setSkills(data?.skills ?? "");
        setInterests(data?.interests ?? "");
      })
      .catch((error) => console.error("Profile fetch error:", error));
  }, [session?.user?.id]);

  async function handleSave() {
    if (!session?.user?.id) {
      alert("You must be logged in.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        qualification,
        skills,
        interests,
      }),
    });

    if (response.ok) {
      alert("Profile saved successfully.");
    } else {
      alert("Failed to save profile.");
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your student profile for better opportunity matches.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={session?.user?.name ?? ""} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={session?.user?.email ?? ""} disabled />
            </div>

            <div>
              <label className="text-sm font-medium">Qualification</label>
              <Input
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. BSc Informatics and Computer Science"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Skills</label>
              <Input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Python, SQL"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Interests</label>
              <Input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Data Science, Cloud, Cybersecurity"
              />
            </div>

            <Button onClick={handleSave}>Save Profile</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}