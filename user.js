const pool = require("./src/config/db");

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log("✅ Tables created successfully");
    } catch (err) {
        console.error("❌ Error creating tables:", err.message);
    }
};

createTables();