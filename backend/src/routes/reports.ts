import { Router } from "express";
import { count, eq } from "drizzle-orm";

import db from "../db/connection";
import { user, opportunity, application } from "../db/schema";

const router = Router();

router.get("/admin/reports", async (req, res) => {
  try {
    const [usersCount] = await db.select({ count: count() }).from(user);

    const [opportunitiesCount] = await db
      .select({ count: count() })
      .from(opportunity);

    const [applicationsCount] = await db
      .select({ count: count() })
      .from(application);

    const [activeOpportunitiesCount] = await db
      .select({ count: count() })
      .from(opportunity)
      .where(eq(opportunity.status, "active"));

    res.json({
      totalUsers: usersCount.count,
      totalOpportunities: opportunitiesCount.count,
      totalApplications: applicationsCount.count,
      activeOpportunities: activeOpportunitiesCount.count,
    });
  } catch (error) {
    console.error("Reports error:", error);
    res.status(500).json({ error: "Failed to load reports" });
  }
});

export default router;