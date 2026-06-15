import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const profile = pgTable("profile", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  qualification: text("qualification"),
  skills: text("skills"),
  interests: text("interests"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const opportunity = pgTable("opportunity", {
  id: text("id").primaryKey(),
  adminId: text("admin_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  organization: text("organization"),
  location: text("location"),
  requirements: text("requirements"),
  deadline: timestamp("deadline"),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const application = pgTable("application", {
  id: text("id").primaryKey(),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  opportunityId: text("opportunity_id")
    .notNull()
    .references(() => opportunity.id, { onDelete: "cascade" }),
  status: text("status").default("submitted").notNull(),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

export const matchScore = pgTable("match_score", {
  id: text("id").primaryKey(),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  opportunityId: text("opportunity_id")
    .notNull()
    .references(() => opportunity.id, { onDelete: "cascade" }),
  relevanceScore: text("relevance_score").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

export const notification = pgTable("notification", {
  id: text("id").primaryKey(),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  opportunityId: text("opportunity_id").references(() => opportunity.id, {
    onDelete: "set null",
  }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const report = pgTable("report", {
  id: text("id").primaryKey(),
  adminId: text("admin_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  reportType: text("report_type").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  profile: one(profile),
  opportunities: many(opportunity),
  applications: many(application),
  matchScores: many(matchScore),
  notifications: many(notification),
  reports: many(report),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));

export const opportunityRelations = relations(opportunity, ({ one, many }) => ({
  admin: one(user, {
    fields: [opportunity.adminId],
    references: [user.id],
  }),
  applications: many(application),
  matchScores: many(matchScore),
  notifications: many(notification),
}));

export const applicationRelations = relations(application, ({ one }) => ({
  student: one(user, {
    fields: [application.studentId],
    references: [user.id],
  }),
  opportunity: one(opportunity, {
    fields: [application.opportunityId],
    references: [opportunity.id],
  }),
}));

export const matchScoreRelations = relations(matchScore, ({ one }) => ({
  student: one(user, {
    fields: [matchScore.studentId],
    references: [user.id],
  }),
  opportunity: one(opportunity, {
    fields: [matchScore.opportunityId],
    references: [opportunity.id],
  }),
}));

export const notificationRelations = relations(notification, ({ one }) => ({
  student: one(user, {
    fields: [notification.studentId],
    references: [user.id],
  }),
  opportunity: one(opportunity, {
    fields: [notification.opportunityId],
    references: [opportunity.id],
  }),
}));

export const reportRelations = relations(report, ({ one }) => ({
  admin: one(user, {
    fields: [report.adminId],
    references: [user.id],
  }),
}));