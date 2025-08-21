import { z } from 'zod'
// defines the environment variables available.  parse will be used to make sure they are defined.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOCAL_DATABASE_URL: z.string().min(1),
  DATABASE_URL: z.string().nonempty('Database URL is undefined')
});

// parse the environment variables against the schema
// if they do not match the schema, an error will be thrown.
const env = envSchema.parse(process.env);

export { env }
