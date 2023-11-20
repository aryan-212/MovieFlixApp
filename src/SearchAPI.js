import express from "express";
import cors from "cors";
import { MOVIES } from "flixhq-core";

const app = express();
app.use(cors());

const flixhq = new MOVIES.FlixHQ();

app.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const movies = await flixhq.search(query);
    res.json(movies); // Send the movie data back to the frontend
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start your server
const PORT = 5000; // Your chosen port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
