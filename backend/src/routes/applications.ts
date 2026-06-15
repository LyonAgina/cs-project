import { Router } from "express";
import crypto from "crypto";
import { eq } from "drizzle-orm";

import db from "../db/connection";
import { application, opportunity } from "../db/schema";

const router = Router();

// Submit application
router.post("/applications", async (req, res) => {
  try {
    const { studentId, opportunityId } = req.body;

    const newApplication = await db
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

// Get applications for a student
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
      .innerJoin(
        opportunity,
        eq(application.opportunityId, opportunity.id)
      )
      .where(eq(application.studentId, studentId));

    res.json(applications);
  } catch (error) {
    console.error("Applications fetch error:", error);
    res.status(500).json({ error: "Failed to load applications" });
  }
});

export default router;