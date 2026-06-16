"use client";

import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
  role: string | null;
};

export default function AdminNotificationsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Users fetch error:", error));
  }, []);

  async function handleSendNotification() {
    if (!studentId || !message) {
      alert("Select a user and enter a message.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        message,
      }),
    });

    if (response.ok) {
      alert("Notification sent successfully.");
      setStudentId("");
      setMessage("");
    } else {
      alert("Failed to send notification.");
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Send notifications to students.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2"
            >
              <option value="">Select user</option>
              {users
                .filter((user) => user.role !== "admin")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </option>
                ))}
            </select>

            <Input
              placeholder="Notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button onClick={handleSendNotification}>
              Send Notification
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}