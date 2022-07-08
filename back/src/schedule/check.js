import schedule from "node-schedule";
import nodemailer from "nodemailer";
import { Reward, UserChallenge } from "../db/index.js";
import { ChallengeService } from "../services/challengeService.js";

const ChallengeSchedule = () => {
  const rule = "0 0 20 * * *";
  schedule.scheduleJob(rule, async () => {
    const result = ChallengeService.findFailedPeople();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "hosahn13@gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "hosahn13@gmail.com",
        pass: "cxgwagqzkgegajzx",
      },
    });
    const text = "오늘의 도전과제를 아직 완료하지 않으셨습니다!";
    for (let i = 0; i < result.length; i++) {
      await transporter.sendMail({
        from: `"밤하늘" <${process.env.NODEMAILER_USER}>`,
        to: result[i].email,
        subject: "밤하늘 챌린지 미완료",
        text: text,
        html: `<b>${text}</b>`,
      });
    }
  });

  const checkRule = "0 24 2 * * *";
  schedule.scheduleJob(checkRule, async () => {
    const result = ChallengeService.findFailedPeople();
    if (result.length > 0) {
      const array = result.map((result) => result.id);
      await ChallengeService.deleteFailedPeople({ array });
      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "hosahn13@gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "hosahn13@gmail.com",
          pass: "cxgwagqzkgegajzx",
        },
      });
      const text = "챌린지를 실패하셨습니다 ,다음에 다시 도전해주세요!";
      for (let i = 0; i < result.length; i++) {
        await transporter.sendMail({
          from: `"밤하늘" <${process.env.NODEMAILER_USER}>`,
          to: result[i].email,
          subject: "밤하늘 챌린지 실패",
          text: text,
          html: `<b>${text}</b>`,
        });
      }
    } else {
      console.log("오늘은 실패자가 없습니다");
    }
  });

  //남아있는 사람들은 일단 필터링을 거친, 아직까지는 성공하고 있는 사람들
  const sendRule = "0 34 2 * * *";
  schedule.scheduleJob(sendRule, async () => {
    for (let i = 10; i <= 50; i = i + 20) {}
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
        await UserChallenge.findChallenge({
          user_id: user1[i],
          challenge_id: completelySuccess1[0].challenge_id,
        });
      }
    }
  }); // 챌린지를 성공한 사람들에게 메일 발송, 보상 지급
};

export { ChallengeSchedule };
