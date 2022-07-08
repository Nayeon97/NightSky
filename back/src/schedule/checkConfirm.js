import { Reward, User, UserChallenge } from "../db/index.js";
import { ChallengeService } from "../services/challengeService.js";

class Schedule {
  static async findUnconfirmed() {
    const result = await ChallengeService.findFailedPeople();
    console.log(result);
    return result;
  }
  static async deleteFailed() {
    const result = await ChallengeService.findFailedPeople();
    console.log(result);
    const array = result.map((result) => result.id);
    console.log(array);
    const deleted = await ChallengeService.deleteFailedPeople({ array });
    console.log(deleted);
    return deleted;
  }
  static async findSucceed() {
    const temporarySuccess11 = await UserChallenge.getTemporarySuccess({
      tempo: 10,
      type: 1,
      duration: 50,
    }); //성공한 사람 확인 50일치중 10일치
    if (temporarySuccess11.length > 0) {
      const user11 = temporarySuccess11.map(
        (temporarySuccess11) => temporarySuccess11.user_id
      ); //유저아이디만 따로 배열 생성
      const reward11 = await Reward.findReward({
        challenge_id: temporarySuccess11[0].challenge_id,
        duration: 10,
      }); //challengeId와 duration을 이용해 보상 확인
      for (let i = 0; i < user11.length; i++) {
        await Reward.giveReward({
          reward: reward11[0].id,
          user: user11[i],
          challenge_id: temporarySuccess11[0].challenge_id,
        }); //giveReward로 성공한 사람의 아이디와 challengeID를 받아 user_reward필드에 보상 넣어주기
      }
    }
    const temporarySuccess21 = await UserChallenge.getTemporarySuccess({
      tempo: 30,
      type: 1,
      duration: 50,
    }); //모든 부분 보상에 대해 반복
    if (temporarySuccess21.length > 0) {
      const user21 = temporarySuccess21.map(
        (temporarySuccess21) => temporarySuccess21.user_id
      );
      const reward21 = await Reward.findReward({
        challenge_id: temporarySuccess21[0].challenge_id,
        duration: 30,
      });
      for (let i = 0; i < user21.length; i++) {
        await Reward.giveReward({
          reward: reward21[0].id,
          user: user21[i],
          challenge_id: temporarySuccess21[0].challenge_id,
        });
      }
    }
    const completelySuccess1 = await UserChallenge.getTemporarySuccess({
      tempo: 50,
      type: 1,
      duration: 50,
    });
    if (completelySuccess1.length > 0) {
      const user1 = completelySuccess1.map(
        (completelySuccess1) => completelySuccess1.user_id
      );
      const reward1 = await Reward.findReward({
        challenge_id: completelySuccess1[0].challenge_id,
        duration: 50,
      });
      for (let i = 0; i < user1.length; i++) {
        console.log();
        await Reward.giveReward({
          reward: reward1[0].id,
          user: user1[i],
          challenge_id: completelySuccess1[0].challenge_id,
        });
      }
    }
  }
}
Schedule.deleteFailed();
Schedule.findSucceed();

export { Schedule };
