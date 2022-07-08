import { Router } from 'express';
import { Report } from '../db/index.js';
import { ChallengeService } from '../services/challengeService.js';
const reportRouter = Router();

reportRouter.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const user_id = req.user.id;
    let emotionData = {
      happy: 0,
      sad: 0,
      angry: 0,
      unrest: 0,
      surprised: 0,
      scunner: 0,
      normal: 0,
    };
    const diaryEmotion = await Report.findMonthlyEmotion({ user_id });

    for (let i = 0; i < diaryEmotion.length; i++) {
      let emotion = diaryEmotion[i].emotion;
      if (emotion == '행복') {
        emotionData['happy'] = diaryEmotion[i].count;
      } else if (emotion == '슬픔') {
        emotionData['sad'] = diaryEmotion[i].count;
      } else if (emotion == '분노') {
        emotionData['angry'] = diaryEmotion[i].count;
      } else if (emotion == '불안') {
        emotionData['unrest'] = diaryEmotion[i].count;
      } else if (emotion == '놀람') {
        emotionData['surprised'] = diaryEmotion[i].count;
      } else if (emotion == '평범') {
        emotionData['normal'] = diaryEmotion[i].count;
      } else if (emotion == '혐오') {
        emotionData['scunner'] = diaryEmotion[i].count;
      }
    }
    const timeLine = await Report.findWhen({ user_id });
    let timeData = {
      morning: timeLine.morning[0].count,
      afternoon: timeLine.afternoon[0].count,
      night: timeLine.night[0].count,
      dawn: timeLine.dawn[0].count,
    };
    const UserTag = await Report.findTags({ user_id });
    const AllUsersTag = await Report.findAllUserTags();
    const challenge = await ChallengeService.getChallengeLog({ user_id });
    res.send({
      emotion: emotionData,
      time: timeData,
      userTag: UserTag,
      allTag: AllUsersTag,
      challenge: challenge,
    });
  } else {
    res.sendStatus(404);
  }
});

export { reportRouter };
