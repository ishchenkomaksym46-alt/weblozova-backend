import { Pool } from 'pg';
import 'dotenv/config'

/** @type {import('pg').Pool} */
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});