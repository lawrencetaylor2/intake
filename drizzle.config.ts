// File: drizzle.config.ts

import { env } from '@/app/utils/Environment';
import { Config } from 'drizzle-kit';

const url =
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.LOCAL_DATABASE_URL;
if (!url)
  throw new Error(
    `Connection string to ${
      process.env.NODE_ENV ? 'Neon' : 'local'
    } Postgres not found.`
  );

export default {
  dialect: 'postgresql',
  dbCredentials: { url },
  schema: './db/schema/',
  out: './drizzle',
} satisfies Config;
