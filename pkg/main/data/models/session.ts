// Copyright 2024-present the Deno authors. All rights reserved. MIT license.
import { char, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessionSchema = pgTable(
  "session",
  {
    id: char("id", { length: 26 }).primaryKey(),
    status: text("status", {
      enum: ["active", "logged_out", "expired", "revoked", "login_requested"],
    }).notNull(),

    oauthRequestState: text("oauth_request_state").notNull(),
    oauthRequestCodeVerifier: text("oauth_request_code_verifier").notNull(),

    loggedInUserId: char("logged_in_user_id", { length: 26 }),
    loggedInAt: timestamp("logged_in_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => ({
    userIdx: index().on(table.loggedInUserId),
  }),
);

export type Session = typeof sessionSchema.$inferSelect;
export type SessionPartial = typeof sessionSchema.$inferInsert;
