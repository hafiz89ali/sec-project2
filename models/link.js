import database from "../database/connection.js";

const createLinksTableSQL = `
CREATE TABLE IF NOT EXISTS links (
    id serial PRIMARY KEY,
    title varchar(255),
    original_link varchar(255),
    shortened_link varchar(255),
    click_count INT NOT NULL,
    created_by uuid REFERENCES users(id),
    created_at timestamp DEFAULT NOW()
);
`;

async function createLinksTable() {
  try {
    await database.query(createLinksTableSQL);
    console.log("Links table ready.");
  } catch (error) {
    return console.log("Error creating todos table", error);
  }
}

export default createLinksTable;
