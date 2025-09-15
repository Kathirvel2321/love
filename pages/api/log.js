const fetch = require("node-fetch"); // if using Node.js

const BIN_ID = "68c8567e43b1c97be94401b6 ";        // replace with your bin ID
const MASTER_KEY = "$2a$10$nMIfDByMZBkNEFBx4wm3z.zbTgALE6L3ZejIwUTI6P7tGwY..a60a"; // replace with your secret key

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, event } = req.body;
    const timestamp = new Date().toISOString();

    // Get current data
    let currentData = [];
    try {
      const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY }
      });
      const getJson = await getRes.json();
      currentData = getJson.record || [];
    } catch (err) {
      console.log("Error fetching current data:", err);
    }

    // Add new entry
    currentData.push({ name, event, timestamp });

    // Update bin
    try {
      await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY,
          "X-Bin-Versioning": "false" // overwrite bin
        },
        body: JSON.stringify(currentData)
      });
      res.status(200).json({ message: "Saved to JSONBin" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save data", details: err });
    }

  } else if (req.method === "GET") {
    // Return current data
    try {
      const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { "X-Master-Key": MASTER_KEY }
      });
      const getJson = await getRes.json();
      res.status(200).json(getJson.record || []);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch data", details: err });
    }
  }
}
