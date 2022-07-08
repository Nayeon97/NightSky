import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Challenge {
  static async findAllChallenges() {
    return await prisma.challenge.findMany({});
  }
  static async findChallenge({ challenge_id }) {
    const result = await prisma.challenge.findFirst({
      where: {
        id: Number(challenge_id),
      },
    });
    return result;
  }

  static async findChallengesById({ challenge_array }) {
    const result = await prisma.challenge.findMany({
      where: {
        id: {
          in: challenge_array,
        },
      },
    });
    return result;
  }
}

export { Challenge };
