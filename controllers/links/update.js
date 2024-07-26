import database from "../../database/connection.js";

const getLinkQuery = `
SELECT * FROM links WHERE id = $1 AND created_by =$2;
`;

const updateQuery = `
UPDATE links
SET title = $1, shortened_link = $2
WHERE id = $3 AND created_by = $4
`;

async function updateLink(req, res) {
  try {
    // Update field from body
    const title = req.body.title;
    const shortenedPath = req.body.shortenedPath;
    const linkId = req.params.id;
    const userId = req.user.id;
    console.log(
      `\nTitle: ${title}, 
      \nShortened Path: ${shortenedPath}, 
      \nLink Id: ${linkId},  
      \nUser Id: ${userId}`
    );

    // Get default todo from db
    const getLinkDb = await database.query(getLinkQuery, [linkId, userId]);
    const defaultLink = getLinkDb.rows[0];
    console.log(defaultLink.id, defaultLink.title);

    if (!defaultLink) {
      return res.status(404).json({ error: "Link not found!" });
    }

    // Update todo
    const values = [
      title || defaultLink.title,
      shortenedPath || defaultLink.shortened.link,
      linkId,
      userId,
    ];
    const dbRes = await database.query(updateQuery, values);

    if (dbRes.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const data = {
      message: "Link updated successfully!",
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default updateLink;
