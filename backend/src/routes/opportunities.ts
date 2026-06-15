import { Router } from "express";
import { desc, eq } from "drizzle-orm";

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

export default router;