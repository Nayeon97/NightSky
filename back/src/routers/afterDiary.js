import { Router } from "express";
import { Activity } from "../db/index.js";
import { Fortune } from "../db/index.js";

const afterDiaryRouter = Router();

afterDiaryRouter.get("/fortune", async (req, res) => {
  if (req.isAuthenticated()) {
    const result = await Fortune.getFortune();
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

afterDiaryRouter.post("/submit", async (req, res) => {
  if (req.isAuthenticated()) {
    const emotion = req.body.emotion;
    const music = await Activity.findMusic({ emotion });
    const activity = await Activity.findActivity({ emotion });
    res.send({ activity: activity, music: music });
  } else {
    res.sendStatus(404);
  }
});

export { afterDiaryRouter };
