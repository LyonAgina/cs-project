import { Router } from "express";
import crypto from "crypto";
import { eq } from "drizzle-orm";

import db from "../db/connection";
import { profile, user } from "../db/schema";

const router = Router();

router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [userProfile] = await db
      .select({
        id: profile.id,
        userId: profile.userId,
        name: user.name,
        email: user.email,
        qualification: profile.qualification,
        skills: profile.skills,
        interests: profile.interests,
      })
      .from(user)
      .leftJoin(profile, eq(user.id, profile.userId))
      .where(eq(user.id, userId));

    res.json(userProfile);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

router.post("/profile", async (req, res) => {
  try {
    const { userId, qualification, skills, interests } = req.body;

    const existingProfile = await db
      .select()
      .from(profile)
      .where(eq(profile.userId, userId));

    if (existingProfile.length > 0) {
      const [updatedProfile] = await db
        .update(profile)
        .set({
          qualification,
          skills,
          interests,
          updatedAt: new Date(),
        })
        .where(eq(profile.userId, userId))
        .returning();

      return res.json(updatedProfile);
    }

    const [newProfile] = await db
      .insert(profile)
      .values({
        id: crypto.randomUUID(),
        userId,
        qualification,
        skills,
        interests,
      })
      .returning();

    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Profile save error:", error);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

export default router;