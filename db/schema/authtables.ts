import {
  boolean,
  timestamp,
  pgEnum,
pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";

import type { AdapterAccountType } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

// 1. Define the enum type
export const roleEnum = pgEnum("Role", ["ADMIN", "STAFF", "PROVIDER", "USER"]);

//Creating an Org
//An org can be created by a user in the user dashboard. This will create an org and automatically set the user as the owner.
export const organization = pgTable("organization", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  owner_user_id: text("owner_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "no action" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
} );

// ------------------- Roles -------------------
// Both foreign keys specify onUpdate('no action'), meaning updates to referenced columns in parent tables will not automatically propagate changes to the roles table.
export const roles = pgTable(
  "roles",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id").notNull().references(() => organization.id, {
      onUpdate: "no action"}),
    userId: text("user_id").notNull().references(() => users.id, {
      onUpdate: "no action"}),
 
    role: roleEnum("role").default("USER").notNull(),
  }
);



// ------------------- Invites -------------------
export const invites = pgTable("invites", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  orgId: text("org_id")
    .notNull()
    .references(() => organization.id, { onUpdate: "no action" }),
  email: text("email").notNull(),
  role: roleEnum("role").default("USER").notNull(),
});
// relations helper useful when you want to query related data
export const inviteRelations = relations(invites, ({ one }) => ({
  organization: one(organization, {
    fields: [invites.orgId],
    references: [organization.id],
  }),
}));

//Authjs Tables
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  displayName: text("displayName"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

export const organizationRelations = relations(organization, ({ one,many }) => ({
  user: one(users,{fields: [organization.owner_user_id], references: [users.id]}),
  roles: many(roles),
  invites: many(invites),
}));

// relations helper useful when you want to query related data
export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// relations helper useful when you want to query related data
export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  organization: many(organization),
  roles: many(roles),
}));

// relations helper useful when you want to query related data
export const roleRelations = relations(roles, ({ one }) => ({
  organization: one(organization, {
    fields: [roles.orgId],
    references: [organization.id],
  }),
  user: one(users, {
    fields: [roles.userId],
    references: [users.id],
  }),
}));