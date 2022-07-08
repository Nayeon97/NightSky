import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();
class UserChallenge {
  static async findChallengesByUser({ user_id }) {
    const result = prisma.user_challenge.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        challenge_id: true,
        is_completed: true,
      },
    });
    return result;
  }

  static async finishChallenge({ user_id, challenge_id }) {
    const result = prisma.user_challenge.updateMany({
      where: {
        user_id: user_id,
        challenge_id: challenge_id,
      },
      data: {
        is_completed: true,
        is_broken: false,
      },
    });
    return result;
  }

  static async findChallenge({ user_id, challenge_id }) {
    const result = prisma.user_challenge.findFirst({
      where: {
        user_id: Number(user_id),
        challenge_id: Number(challenge_id),
        is_completed: false,
      },
    });
    return result;
  }

  static async findUncompleted({ user_id }) {
    const result = prisma.user_challenge.findMany({
      where: {
        user_id: user_id,
        is_completed: false,
      },
      select: {
        challenge_id: true,
      },
    });
  }
  static async addChallenge({ user_id, challenge_id, type, duration }) {
    const start = moment().format();
    const end = moment().add(duration, "d").format();
    const result = prisma.user_challenge.create({
      data: {
        user_id: Number(user_id),
        challenge_id: Number(challenge_id),
        type: Number(type),
        is_completed: false,
        is_broken: true,
        start_date: start,
        end_date: end,
      },
    });
    return result;
  }
  static async deleteChallenge({ user_id, challenge_id }) {
    const result = prisma.user_challenge.deleteMany({
      where: {
        challenge_id: Number(challenge_id),
        user_id: Number(user_id),
      },
    });
    return result;
  }

  static async deleteChallengeByIds({ array }) {
    const result = prisma.user_challenge.deleteMany({
      where: {
        user_id: {
          in: array,
        },
      },
    });
    return result;
  }
  static async findFailed({}) {
    const result = prisma.users.findMany({
      where: {
        daily_check: false,
      },
      select: {
        id: true,
      },
    });
    return result;
  }

  static async getTemporarySuccess({ tempo, duration, type }) {
    const result =
      await prisma.$queryRaw`select user_id, challenge_id from user_challenge WHERE date_sub(NOW(), INTERVAL ${tempo} DAY) >= start_date AND type = ${type} AND date_sub(end_date, INTERVAL ${duration} day) = start_date; `;
    return result;
  }
}
export { UserChallenge };
