"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  sentAt: string;
};

export default function NotificationsPage() {
  const { data: session } = authClient.useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchNotifications(userId: string) {
    fetch(`http://localhost:3000/api/notifications/${userId}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Notifications fetch error:", error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!session?.user?.id) return;
    fetchNotifications(session.user.id);
  }, [session?.user?.id]);

  async function markAsRead(id: string) {
    const response = await fetch(
      `http://localhost:3000/api/notifications/${id}/read`,
      {
        method: "PATCH",
      }
    );

    if (response.ok && session?.user?.id) {
      fetchNotifications(session.user.id);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            View updates from administrators.
          </p>
        </div>

        {loading && <p>Loading notifications...</p>}

        <div className="space-y-4">
          {!loading && notifications.length === 0 ? (
            <p className="text-muted-foreground">
              You have no notifications yet.
            </p>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id}>
                <CardHeader>
                  <CardTitle>
                    {notification.isRead ? "Read Notification" : "New Notification"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(notification.sentAt).toDateString()}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p>{notification.message}</p>

                  {!notification.isRead && (
                    <Button
                      variant="outline"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}