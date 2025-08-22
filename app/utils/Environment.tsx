import { z } from 'zod'
// defines the environment variables available.  parse will be used to make sure they are defined.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOCAL_DATABASE_URL: z.string().min(1, 'Local Database URL is undefined'),
  DATABASE_URL: z.string().nonempty('Database URL is undefined'),
  AUTH_GOOGLE_SECRET: z.string().min(1, 'Google secret is required'),
  AUTH_GOOGLE_ID: z.string().min(1, 'Google ID is required'),
  AUTH_APPLE_SECRET: z.string().min(1, 'Apple secret is required'),
  AUTH_APPLE_ID: z.string().min(1, 'Apple ID is required'),
  AUTH_SECRET: z.string().min(1, 'Auth secret is required'),
})

// parse the environment variables against the schema
// if they do not match the schema, an error will be thrown.
const env = envSchema.parse(process.env)

export { env }
