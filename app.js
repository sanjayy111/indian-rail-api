import express from "express";
import cors from "cors";
import { config } from "dotenv";

import home from "./routes/home.js";
import gettrain from "./routes/getTrains.js";

config();

const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Enable CORS globally
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"], // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Optional but recommended:
app.use(express.json());

// Routes
app.use("/", home);
app.use("/trains", gettrain);

// Start server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


