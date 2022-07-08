// import { BasicModel } from "../index.js";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();
class Reward {
  static async giveReward({ reward, user, challenge_id }) {
    const alreadyGiven = await prisma.user_rewards.findFirst({
      where: {
        reward_id: reward,
        user_id: user,
      },
    });
    if (alreadyGiven) return false;
    else {
      return await prisma.user_rewards.create({
        data: {
          challenge_id: challenge_id,
          reward_id: reward,
          user_id: user,
        },
      });
    }
  }
  static async findRewardNames({ array }) {
    const result = prisma.reward.findMany({
      where: {
        id: {
          in: array,
        },
      },
      select: {
        reward: true,
      },
    });
    return result;
  }
  static async findReward({ challenge_id, duration }) {
    const result = prisma.reward.findMany({
      where: {
        challenge_id: challenge_id,
        duration: duration,
      },
      select: {
        id: true,
      },
    });
    return result;
  }
  static async findUserRewards({ user_id }) {
    const result = prisma.user_rewards.findMany({
      where: {
        user_id: user_id,
      },
    });
    return result;
  }
}

export { Reward };
