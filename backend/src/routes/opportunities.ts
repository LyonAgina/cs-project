import { Router } from "express";
import { desc, eq } from "drizzle-orm";
import crypto from "crypto";

import db from "../db/connection";
import { opportunity } from "../db/schema";

const router = Router();

router.get("/opportunities", async (req, res) => {
  try {
    const opportunities = await db
      .select()
      .from(opportunity)
      .where(eq(opportunity.status, "active"))
      .orderBy(desc(opportunity.createdAt));

    res.json(opportunities);
  } catch (error) {
    console.error("Opportunities error:", error);
    res.status(500).json({ error: "Failed to load opportunities" });
  }
});

router.post("/opportunities", async (req, res) => {
  try {
    const {
      adminId,
      title,
      category,
      organization,
      location,
      requirements,
      deadline,
    } = req.body;

    const [newOpportunity] = await db
      .insert(opportunity)
      .values({
        id: crypto.randomUUID(),
        adminId,
        title,
        category,
        organization,
        location,
        requirements,
        deadline: deadline ? new Date(deadline) : null,
        status: "active",
      })
      .returning();

    res.status(201).json(newOpportunity);
  } catch (error) {
    console.error("Create opportunity error:", error);
    res.status(500).json({ error: "Failed to create opportunity" });
  }
});

router.get("/opportunities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [singleOpportunity] = await db
      .select()
      .from(opportunity)
      .where(eq(opportunity.id, id));

    if (!singleOpportunity) {
      return res.status(404).json({ error: "Opportunity not found" });
    }

    res.json(singleOpportunity);
  } catch (error) {
    console.error("Opportunity details error:", error);
    res.status(500).json({ error: "Failed to load opportunity details" });
  }
});

router.delete("/opportunities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.delete(opportunity).where(eq(opportunity.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error("Delete opportunity error:", error);
    res.status(500).json({ error: "Failed to delete opportunity" });
  }
});

export default router;