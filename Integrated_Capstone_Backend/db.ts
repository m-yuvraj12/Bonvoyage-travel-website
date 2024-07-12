import { Pool } from 'pg';

// Connect to your postgresql database by giving the database and password values
export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Banvoyage',
    password: '@Abhisekh21',
    port: 5432,
});


