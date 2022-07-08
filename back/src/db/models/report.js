import { PrismaClient } from '@prisma/client';
import pkg from 'moment';
const { months } = pkg;
import moment from 'moment';
const prisma = new PrismaClient();

class Report {
  static async findMonthlyEmotion({ user_id }) {
    const from = moment().add(1, 'days').format('YYYY-MM-DD');
    const to = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const result =
      await prisma.$queryRaw`select count(*) as count, emotion from diary where user_id = ${user_id}
      AND ( date between ${to} and ${from}) AND (deleted = false) group by emotion;
`;
    return result;
  }

  static async findWhen({ user_id }) {
    const morning = await prisma.$queryRaw`
    select count(*) as count from diary where user_id = ${user_id}
AND ( hour(DATE_ADD(date, INTERVAL 9 HOUR))  >= 6 AND  hour(DATE_ADD(date, INTERVAL 9 HOUR)) < 13)  AND (deleted = false);`;
    const afternoon = await prisma.$queryRaw`
    select count(*) as count from diary where user_id = ${user_id}
AND ( hour(DATE_ADD(date, INTERVAL 9 HOUR)) >= 13 AND hour(DATE_ADD(date, INTERVAL 9 HOUR)) < 18) AND (deleted = false)
    `;
    const night = await prisma.$queryRaw`
    select count(*) as count from diary where user_id = ${user_id}
AND (hour(DATE_ADD(date, INTERVAL 9 HOUR)) >= 18 AND hour(DATE_ADD(date, INTERVAL 9 HOUR)) < 24) AND (deleted = false)
`;
    const dawn = await prisma.$queryRaw`
select count(*) as count from diary where user_id = ${user_id}
AND ( hour( DATE_ADD(date, INTERVAL 9 HOUR)) >= 0 AND hour( DATE_ADD(date, INTERVAL 9 HOUR)) < 6) AND (deleted = false)
`;
    return { morning, afternoon, night, dawn };
  }

  static async findTags({ user_id }) {
    const from = moment().add(1, 'days').format('YYYY-MM-DD');
    const to = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const result = await prisma.$queryRaw`
    select count(*) as count, tag from diary where user_id = ${user_id}
AND ( date between ${to} and ${from}) AND (deleted = false)
group by tag order by count desc limit 3
    `;
    return result;
  }
  static async findAllUserTags() {
    const from = moment().add(1, "days").format("YYYY-MM-DD");
    const to = moment().subtract(1, "months").format("YYYY-MM-DD");
    const result = await prisma.$queryRaw`
    select count(*) as count, tag from diary where ( date between ${to} and ${from}) AND (deleted = false)group by tag order by count desc limit 4
    `;
    let array = [];
    for (let i = 0; i < 4; i++) {
      if (result[i].tag == '') {
        continue;
      } else {
        if (array.length != 3) {
          array.push(result[i]);
        }
      }
    }
    return array;
  }
}

export { Report };
