import { timestamp, jsonb, pgTable, text, varchar } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'

import { organization } from './authtables'

export const patients = pgTable('patients', {
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
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  dob: timestamp('dob', { mode: 'date' }).notNull(),
  gender: varchar('gender', { length: 20 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  insurance_info: jsonb('insurance_info')
    .$type<{
      provider: string
      policyNumber: string
      groupNumber?: string
    }>()
    .notNull(),
})

//Define the relations
export const patientsRelations = relations(patients, ({ one }) => ({
  organization: one(organization, {
    fields: [patients.orgId],
    references: [organization.id],
  }),
}))

export const organizationToPatientsRelations = relations(
  organization,
  ({ many }) => ({
    patients: many(patients),
  })
)
