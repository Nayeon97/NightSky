import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class Calendar {
  static async findMonthly({ fromDate, toDate, user_id }) {
    const result =
      await prisma.$queryRaw`SELECT * FROM diary  WHERE user_id = ${user_id} AND (date between date_format(${fromDate}, '%Y-%m-%d/%H:%m:%s') and date_format(${toDate}, '%Y-%m-%d/%H:%m:%s')) AND deleted = 0`;
    return result;
  }
  static async findMonthlyEmotion({ fromDate, toDate, user_id }) {
    const result =
      await prisma.$queryRaw`SELECT * FROM diary  WHERE user_id = ${user_id} AND (date between date_format(${fromDate}, '%Y-%m-%d/%H:%m:%s') and date_format(${toDate}, '%Y-%m-%d/%H:%m:%s')) AND deleted = 0`;
    return 0;
  }
  static async findMonthlyChallenge({ fromDate, toDate, user_id }) {
    const result =
      await prisma.$queryRaw`SELECT * FROM diary  WHERE user_id = ${user_id} AND (date between date_format(${fromDate}, '%Y-%m-%d/%H:%m:%s') and date_format(${toDate}, '%Y-%m-%d/%H:%m:%s')) AND deleted = 0`;
    return 0;
  }
  static async findMonthlyViews({ fromDate, toDate, user_id }) {
    const result =
      await prisma.$queryRaw`SELECT * FROM diary  WHERE user_id = ${user_id} AND (date between date_format(${fromDate}, '%Y-%m-%d/%H:%m:%s') and date_format(${toDate}, '%Y-%m-%d/%H:%m:%s')) AND deleted = 0`;
    return 0;
  }
}

export { Calendar };
