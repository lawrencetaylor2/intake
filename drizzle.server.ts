// File: drizzle.server.ts
import { env } from '@/app/utils/Environment';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { WebSocket } from 'ws';

const connectionString =
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.LOCAL_DATABASE_URL;

if (env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = WebSocket;
  neonConfig.poolQueryViaFetch = true;
} else {
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

const pool = new Pool({ connectionString });

export default drizzle(pool, { casing: 'snake_case' });
