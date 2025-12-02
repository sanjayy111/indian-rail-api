import { Router } from "express";
import UserAgent from "user-agents";
import Prettify from "../utils/prettify.js";
import * as cheerio from "cheerio";

const prettify = new Prettify();
const router = Router();

// ❌ REMOVE ALL CORS FROM HERE
// ❌ REMOVE app.use(cors())

router.get("/getTrain", async (req, resp) => {
  const trainNo = req.query.trainNo;
  const URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;

  try {
    const response = await fetch(URL_Train);
    const data = await response.text();
    const json = prettify.CheckTrain(data);
    resp.json(json);
  } catch (e) {
    resp.send(e.message);
  }
});

router.get("/betweenStations", async (req, resp) => {
  const from = req.query.from;
  const to = req.query.to;

  const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;

  try {
    const userAgent = new UserAgent();
    const response = await fetch(URL_Trains, {
      method: "GET",
      headers: { "User-Agent": userAgent.toString() }
    });

    const data = await response.text();
    const json = prettify.BetweenStation(data);
    resp.json(json);

  } catch (error) {
    console.log(error.message);
  }
});

export default router;
