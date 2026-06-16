import { Router } from "express";
import crypto from "crypto";
import { eq } from "drizzle-orm";

import db from "../db/connection";
import { application, opportunity, user } from "../db/schema";

const router = Router();

router.post("/applications", async (req, res) => {
  try {
    const { studentId, opportunityId } = req.body;

    const [newApplication] = await db
      .insert(application)
      .values({
        id: crypto.randomUUID(),
        studentId,
        opportunityId,
        status: "submitted",
      })
      .returning();

    res.status(201).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to apply" });
  }
});

router.get("/applications/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const applications = await db
      .select({
        id: application.id,
        status: application.status,
        appliedAt: application.appliedAt,
        opportunityTitle: opportunity.title,
        organization: opportunity.organization,
        category: opportunity.category,
      })
      .from(application)
      .innerJoin(opportunity, eq(application.opportunityId, opportunity.id))
      .where(eq(application.studentId, studentId));

    res.json(applications);
  } catch (error) {
    console.error("Applications fetch error:", error);
    res.status(500).json({ error: "Failed to load applications" });
  }
});

router.get("/admin/applications", async (req, res) => {
  try {
    const applications = await db
      .select({
        id: application.id,
        status: application.status,
        appliedAt: application.appliedAt,
        studentName: user.name,
        studentEmail: user.email,
        opportunityTitle: opportunity.title,
        organization: opportunity.organization,
      })
      .from(application)
      .innerJoin(user, eq(application.studentId, user.id))
      .innerJoin(opportunity, eq(application.opportunityId, opportunity.id));

    res.json(applications);
  } catch (error) {
    console.error("Admin applications fetch error:", error);
    res.status(500).json({ error: "Failed to load admin applications" });
  }
});

router.patch("/applications/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [updatedApplication] = await db
      .update(application)
      .set({ status })
      .where(eq(application.id, id))
      .returning();

    res.json(updatedApplication);
  } catch (error) {
    console.error("Application status update error:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

export default router;