import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Activity {
  static async findActivity({ emotion }) {
    return await prisma.$queryRaw`select title from activity where emotion = ${emotion} order by rand() limit 1 `;
  }
  static async findMusic({ emotion }) {
    if (emotion == "슬픔") {
      return await prisma.$queryRaw`select title, artist from music where genre = "ballad" order by rand() limit 1`;
    } else if (emotion == "행복") {
      return await prisma.$queryRaw`select title, artist from music where genre = "dance" order by rand() limit 1`;
    } else if (emotion == "분노") {
      return await prisma.$queryRaw`select title, artist from music where genre = "rnh" order by rand() limit 1`;
    } else if (emotion == "평범") {
      return await prisma.$queryRaw`select title, artist from music where genre = "idol" order by rand() limit 1`;
    } else if (emotion == "놀람") {
      return await prisma.$queryRaw`select title, artist from music where genre = "jazz" order by rand() limit 1`;
    } else if (emotion == "혐오") {
      return await prisma.$queryRaw`select title, artist from music where genre = "folk" order by rand() limit 1`;
    } else if (emotion == "불안") {
      return await prisma.$queryRaw`select title, artist from music where genre = "indie" order by rand() limit 1`;
    }
  }
}

export { Activity };
