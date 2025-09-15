let logData = []; // Memory storage for demo (resets on deploy)

export default function handler(req, res) {
  if(req.method === "POST"){
    const { name, event } = JSON.parse(req.body);
    const timestamp = new Date().toISOString();
    logData.push({ name, event, timestamp });
    console.log(logData);
    res.status(200).json({ message: "Logged", logData });
  } else if(req.method === "GET"){
    res.status(200).json(logData);
  }
}
