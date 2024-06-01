import 'dotenv/config';

import { db, client } from './index';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

await migrate(db, { migrationsFolder: './migrations' });

await client.end();
