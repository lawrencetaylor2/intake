import { timestamp, pgTable, text, varchar, pgEnum } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'

import { organization } from './authtables'
import { patients } from './patient'
// Service Requests (referrals/intake)
/*CREATE TABLE service_requests (
request_id UUID PRIMARY KEY,
org_id UUID NOT NULL REFERENCES organization(orgId),
patient_id UUID NOT NULL REFERENCES patients(patient_id),
referring_provider VARCHAR(255),
reason TEXT,
status VARCHAR(50) CHECK (status IN ('received','in_review','approved','assigned')),
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);*/

// 1. Define the enum type
export const serviceRequestStatusEnum = pgEnum('Status', [
  'received',
  'in_review',
  'approved',
  'assigned',
])

export const serviceRequests = pgTable('service_requests', {
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
  patientId: text('patient_id')
    .notNull()
    .references(() => patients.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  referring_provider: varchar('referring_provider', { length: 255 }).notNull(),
  reason: text('reason').notNull(),
  status: serviceRequestStatusEnum('status').default('received').notNull(),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})
//Define the relations
export const serviceRequestRelations = relations(
  serviceRequests,
  ({ one }) => ({
    organization: one(organization, {
      fields: [serviceRequests.orgId],
      references: [organization.id],
    }),
    patient: one(patients, {
      fields: [serviceRequests.patientId],
      references: [patients.id],
    }),
  })
)

// You can also define reverse relations if needed
export const patientToServiceRequestsRelations = relations(
  patients,
  ({ many }) => ({
    serviceRequests: many(serviceRequests),
  })
)
