import database from "../../database/connection.js";
import { exec } from "child_process";

const query = `
SELECT original_link, click_count FROM links WHERE shortened_link = $1
`;

const updateCounterQuery = `
UPDATE links SET click_count = click_count + 1 WHERE shortened_link = $1
`;

async function redirect(req, res) {
  try {
    const params = req.params;
    const shortenedPath = params.name;

    const dbRes = await database.query(query, [shortenedPath]);
    const originalLink = dbRes.rows[0]?.original_link;
    console.log(`Shortened URL: http://localhost:3000/${shortenedPath}`);
    console.log(`Redirect to: ${originalLink}`);

    if (!originalLink) {
      return res.status(404).json({ error: "Link not found!" });
    }

    exec(`start ${originalLink}`);

    const clickCount = dbRes.rows[0]?.click_count;
    console.log(`Previous click count: ${clickCount}`);

    database.query(updateCounterQuery, [shortenedPath]);

    const dbRes2 = await database.query(query, [shortenedPath]);
    const newClickCount = dbRes2.rows[0]?.click_count;
    console.log(`Current click count: ${newClickCount}`);

    const data = {
      message: `Redirect link success!`,
    };

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default redirect;
