import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GIPHY_KEY = process.env.GIPHY_KEY; // store in Render secrets

app.get("/giphy", async (req, res) => {
  const query = req.query.query || "";
  const limit = parseInt(req.query.limit) || 20;

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(query)}&limit=${limit}`
    );
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Proxy error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Giphy proxy running on port ${PORT}`));
