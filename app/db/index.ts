import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

function getClientConfig(): pg.ClientConfig {
    if (process.env.DB_HOST === undefined) {
        throw new Error("DB_HOST environment variable is required");
    }
    
    if (process.env.DB_USER === undefined) {
        throw new Error("DB_USER environment variable is required");
    }
    
    if (process.env.DB_PASSWORD === undefined) {
        throw new Error("DB_PASSWORD environment variable is required");
    }
    
    if (process.env.DB_NAME === undefined) {
        throw new Error("DB_NAME environment variable is required");
    }
    
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };
    
}

const client = new pg.Client(getClientConfig());

await client.connect();

const db = drizzle(client);

export { db, client }