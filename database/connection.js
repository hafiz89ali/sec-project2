import pg from "pg";
//import dotenv from "dotenv";
import createUsersTable from "../models/user.js";
import createLinksTable from "../models/link.js";

const { Client } = pg;

// load environment variables from .env file
// dotenv.config();

const database = new Client({
  user: "postgres",
  password: "password",
  host: "127.0.0.1",
  port: 5432,
  database: "adnexio-sec-may-project2",
});

async function testConnectionAndLog() {
  try {
    await database.connect();
    const queryTime = await database.query("SELECT NOW()");
    const databaseName = await database.query("SELECT current_database()");
    const currentTime = queryTime.rows[0].now;
    const currentDatabase = databaseName.rows[0].current_database;
    console.log(`Connected to ${currentDatabase} at ${currentTime}`);
    await createUsersTable();
    await createLinksTable();
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}

testConnectionAndLog();

export default database;
