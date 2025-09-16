import { MongoClient } from "mongodb";

let client;
const uri = process.env.MONGO_URI; // your MongoDB connection string

export default async function handler(req, res) {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const db = client.db("foralagee"); // DB name
  const collection = db.collection("logs");

  if (req.method === "POST") {
    const { name, event } = req.body;
    const timestamp = new Date().toISOString();
    await collection.insertOne({ name, event, timestamp });
    res.status(200).json({ message: "Logged" });
  } else if (req.method === "GET") {
    const logs = await collection.find({}).toArray();
    res.status(200).json(logs);
  }
}
