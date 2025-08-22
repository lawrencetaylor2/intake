import { timestamp, pgTable, text, varchar, jsonb } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { organization, users } from './authtables'

/*
-- Audit Log
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(tenant_id),
    user_id UUID NOT NULL REFERENCES users(user_id),
    action VARCHAR(255),
    entity_type VARCHAR(50),
    entity_id UUID,
    timestamp TIMESTAMP DEFAULT now(),
    details JSONB
);
*/
export const auditLogs = pgTable('audit_logs', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  orgId: text('org_id')
    .notNull()
    .references(() => organization.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  action: varchar('action', { length: 255 }),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: text('entity_id'),
  timestamp: timestamp('timestamp', { mode: 'date' }).defaultNow().notNull(),
  details: jsonb('details'),
})

// Define the relations
export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organization: one(organization, {
    fields: [auditLogs.orgId],
    references: [organization.id],
  }),
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}))

export const userToAuditLogsRelations = relations(users, ({ many }) => ({
  auditLogs: many(auditLogs),
}))

export const organizationToAuditLogsRelations = relations(
  organization,
  ({ many }) => ({
    auditLogs: many(auditLogs),
  })
)
