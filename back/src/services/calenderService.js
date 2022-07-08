import { Calendar } from "../db/index.js";
export default class CalendarService {
  static async getMonthly({ year, month, user_id }) {
    try {
      month = Number(month);
      const fromDate =
        year.toString() + "-" + month.toString() + "-01/00:00:00";
      const toDate =
        year.toString() + "-" + (month + 1).toString() + "-01/00:00:00";
      return await Calendar.findMonthly({ fromDate, toDate, user_id });
    } catch (e) {
      return null;
    }
  }
}
