import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log(process.env.NEXT_PUBLIC_NEON_URL);

export default defineConfig({
  schema: './config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_cf7iM8HeJSra@ep-old-queen-a1ddbkhs-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  },
});
