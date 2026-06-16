import { Router } from "express";
import { asc } from "drizzle-orm";

import db from "../db/connection";
import { user } from "../db/schema";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        banned: user.banned,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(asc(user.createdAt));

    res.json(users);
  } catch (error) {
    console.error("Users fetch error:", error);
    res.status(500).json({ error: "Failed to load users" });
  }
});

export default router;