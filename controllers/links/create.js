import { title } from "node:process";
import database from "../../database/connection.js";
import * as crypto from "node:crypto";

const query = `
INSERT INTO links (title, original_link, shortened_link, click_count, created_by)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, title, original_link, shortened_link, click_count, created_by, created_at;
`;

async function createLink(req, res) {
  try {
    const title = req.body.title; // title is optional
    const originalLink = req.body.original_link; // ori link
    if (!originalLink) {
      return res.status(400).json({ error: "Link is required!" });
    }

    // Shorten original link and create shortened link
    const shortened_Link = crypto.randomBytes(5).toString("hex");
    const newURL = `http://localhost:3000/${shortened_Link}`;

    // Set click counter => 0
    const click_count = 0;

    // req.user comes from the middleware isAuth
    const createdBy = req.user.id;
    const values = [
      title,
      originalLink,
      shortened_Link,
      click_count,
      createdBy,
    ];

    await database.query(query, values);
    const data = {
      message: "Link created successully!",
    };

    console.log(`URL ${newURL} succesfully assigned to URL ${originalLink}.`);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default createLink;
