import 'dotenv/config';

import { Config, defineConfig } from 'drizzle-kit';

function getDrizzleConfig(): Config {
    if (process.env.DB_HOST === undefined) {
        throw new Error('DB_HOST environment variable is required');
    }

    if (process.env.DB_USER === undefined) {
        throw new Error('DB_USER environment variable is required');
    }

    if (process.env.DB_PASSWORD === undefined) {
        throw new Error('DB_PASSWORD environment variable is required');
    }

    if (process.env.DB_NAME === undefined) {
        throw new Error('DB_NAME environment variable is required');
    }

    return {
        schema: './app/db/schema.ts',
        out: './migrations',
        dialect: 'postgresql',
        dbCredentials: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
    };
    
}

export default defineConfig(getDrizzleConfig());