import { Strategy } from "passport-naver";
import passport from "passport";
import "../config/env.js";
import { PrismaClient } from "@prisma/client";
import { User } from "../db/index.js";
const prisma = new PrismaClient();

const option = {
  clientID: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  callbackURL: "http://localhost:5001/user/navercomplete",
};

const verify = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const result = await User.findUser({ email, social: "naver" });
  try {
    if (result) {
      return done(null, result);
    } else {
      const createdUser = await prisma.users.create({
        data: {
          email: email,
          pw: process.env.LOCAL_PASSWORD,
          social: "naver",
        },
      });
      return done(null, result);
    }
  } catch (error) {
    return done(false, result);
  }
};

export const NaverStrategy = () => {
  passport.use("naver", new Strategy(option, verify));
};
