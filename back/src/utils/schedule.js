import * as schedule from "node-schedule";
import { User } from "../db/index.js";
const rule = new schedule.RecurrenceRule();
rule.tz = "Asia/Seoul";
export default class daySchedule {
  static initDiary() {
    rule.hour = 6;
    rule.minute = 0;
    const initDiary = schedule.scheduleJob(rule, async function () {
      await User.dailyInit();
      console.log("유저 다이어리 쓰기 초기화 완료.");
    });
  }
}
