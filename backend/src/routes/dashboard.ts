import { Router } from "express";
import { desc, eq } from "drizzle-orm";

import db from "../db/connection";
import { opportunity } from "../db/schema";

const router = Router();

router.get("/dashboard", async (req, res) => {
  try {
    const opportunities = await db
      .select()
      .from(opportunity)
      .where(eq(opportunity.status, "active"))
      .orderBy(desc(opportunity.createdAt))
      .limit(5);

    res.json({
      recommendedCount: opportunities.length,
      applicationsCount: 0,
      profileMatch: 0,
      topOpportunities: opportunities,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Failed to load dashboard data" });
  }
});

export default router;