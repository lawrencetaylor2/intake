// Documents (consent forms, uploads)
/*CREATE TABLE documents (
document_id UUID PRIMARY KEY,
tenant_id UUID NOT NULL REFERENCES tenants(tenant_id),
patient_id UUID NOT NULL REFERENCES patients(patient_id),
file_path TEXT NOT NULL,
doc_type VARCHAR(100),
created_at TIMESTAMP DEFAULT now()
);*/

import {
  timestamp,
  pgTable,
  text,
  varchar,
  primaryKey,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { organization } from './authtables'
import { patients } from './patient'

export const documents = pgTable(
  'documents',
  {
    id: text('id')
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
    filePath: text('file_path').notNull(),
    docType: varchar('doc_type', { length: 100 }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      name: 'doc_patient_org_pk',
      columns: [table.orgId, table.patientId, table.id],
    }),
  ]
)

// Define the relations
export const documentsRelations = relations(documents, ({ one }) => ({
  organization: one(organization, {
    fields: [documents.orgId],
    references: [organization.id],
  }),
  patient: one(patients, {
    fields: [documents.patientId],
    references: [patients.id],
  }),
}))

export const patientToDocumentsRelations = relations(patients, ({ many }) => ({
  documents: many(documents),
}))
