import { Reward } from "../db/index.js";

class RewardService {
  static async getUserRewards({ user_id }) {
    const rewards = await Reward.findUserRewards({ user_id });
    const array = rewards.map((rewards) => rewards.reward_id);
    const result = await Reward.findRewardNames({ array });
    const resultArray = result.map((result) => result.reward);
    return resultArray;
  }
}
export { RewardService };
