// import { BasicModel } from "../index.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class User {
  static async createUser({ social, pw, email }) {
    const isUser = await prisma.users.findFirst({
      where: {
        email: email,
        social: social,
      },
    });
    if (isUser) {
      console.log("가입된 이메일");
      return null;
    }
    const createdUser = await prisma.users.create({
      data: {
        social: social,
        email: email,
        pw: pw,
      },
    });
    return createdUser;
  }
  static async findUser({ email, social, pw }) {
    if (pw) {
      const foundUser = await prisma.users.findFirst({
        where: {
          email: email,
          social: social,
          pw: pw,
        },
      });
      return foundUser;
    } else {
      const foundUser = await prisma.users.findFirst({
        where: {
          email: email,
          social: social,
        },
      });
      return foundUser;
    }
  }
}

export { User };
