import {
  timestamp,
  pgTable,
  text,
  serial,
  jsonb,
  unique,
} from 'drizzle-orm/pg-core'
import { users } from './authtables'
import { relations } from 'drizzle-orm'

/*CREATE TABLE user_column_configs (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  table_id TEXT NOT NULL,           -- identifies which table (patients, invoices, etc.)
  config JSONB NOT NULL,            -- stores column config
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, table_id)         -- one config per user per table
);*/

export const user_column_configs = pgTable(
  'userColumnConfigs',
  {
    id: serial('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    tableId: text('table_id').notNull(), //patient,serviceRequest,etc
    config: jsonb('config').notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (userColumnConfigs) => [
    unique().on(userColumnConfigs.userId, userColumnConfigs.tableId),
  ]
)

//user column relation

export const userColumnToUserRelation = relations(
  user_column_configs,
  ({ one }) => ({
    user: one(users, {
      fields: [user_column_configs.userId],
      references: [users.id],
    }),
  })
)

export const userToUserConfigRelation = relations(users, ({ many }) => ({
  config: many(user_column_configs),
}))
