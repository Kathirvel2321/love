import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let collection;

async function initDB() {
  if (!collection) {
    await client.connect();
    const db = client.db("loveApp"); // database name
    collection = db.collection("logs"); // collection name
  }
}

export default async function handler(req, res) {
  await initDB();

  if (req.method === "POST") {
    const { name, event } = req.body;
    const timestamp = new Date().toISOString();
    await collection.insertOne({ name, event, timestamp });
    res.status(200).json({ message: "Saved to MongoDB" });
  } else if (req.method === "GET") {
    const logs = await collection.find().toArray();
    res.status(200).json(logs);
  }
}
