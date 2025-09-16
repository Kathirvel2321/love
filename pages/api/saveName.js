export default function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    console.log("User name:", name); // this will show in Vercel logs

    res.status(200).json({ success: true, name });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
