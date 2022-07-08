import { ChallengeService } from "../services/challengeService.js";
import { Router } from "express";

const challengeRouter = Router();

challengeRouter.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const user_id = req.user.id;
    const result = await ChallengeService.getChallengeLog({ user_id });
    const challenges = await ChallengeService.findAllChallenges();
    res.send({ log: result, challenge: challenges });
  } else {
    res.send(false);
  }
});

challengeRouter.get("/start/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const user_id = req.user.id;
    if (!user_id) {
      res.send(false);
    }
    const challenge_id = req.params.id;
    const result = await ChallengeService.setChallenge({
      user_id,
      challenge_id,
    });
    res.send(result);
  } else {
    res.send(false);
  }
});

challengeRouter.get("/stop/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const user_id = req.user.id;
    const challenge_id = req.params.id;
    const result = await ChallengeService.stopChallenge({
      user_id,
      challenge_id,
    });
    res.send(result);
  } else {
    res.send(false);
  }
});

export { challengeRouter };
