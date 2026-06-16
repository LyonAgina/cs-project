import { Router } from "express";
import crypto from "crypto";
import { desc, eq } from "drizzle-orm";

import db from "../db/connection";
import { notification } from "../db/schema";

const router = Router();

router.post("/notifications", async (req, res) => {
  try {
    const { studentId, opportunityId, message } = req.body;

    const [newNotification] = await db
      .insert(notification)
      .values({
        id: crypto.randomUUID(),
        studentId,
        opportunityId: opportunityId || null,
        message,
        isRead: false,
      })
      .returning();

    res.status(201).json(newNotification);
  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.get("/notifications/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const notifications = await db
      .select()
      .from(notification)
      .where(eq(notification.studentId, studentId))
      .orderBy(desc(notification.sentAt));

    res.json(notifications);
  } catch (error) {
    console.error("Fetch notifications error:", error);
    res.status(500).json({ error: "Failed to load notifications" });
  }
});

router.patch("/notifications/:id/read", async (req, res) => {
  try {
    const { id } = req.params;

    const [updatedNotification] = await db
      .update(notification)
      .set({ isRead: true })
      .where(eq(notification.id, id))
      .returning();

    res.json(updatedNotification);
  } catch (error) {
    console.error("Update notification error:", error);
    res.status(500).json({ error: "Failed to update notification" });
  }
});

export default router;