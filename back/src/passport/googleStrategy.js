import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import '../config/env.js';
import { PrismaClient } from '@prisma/client';
import { User } from '../db/index.js';

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const option = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://kdt-ai4-team12.elicecoding.com/api/user/googlecomplete',
  passReqToCallback: true,
};

const verify = async (request, accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const result = await User.findUser({ email, social: 'google' });
  try {
    if (result) {
      return done(null, result);
    } else {
      const createdUser = await prisma.users.create({
        data: {
          email: email,
          pw: '1234',
          social: 'google',
          name: '밤하늘',
        },
      });
      return done(null, createdUser);
    }
  } catch (error) {
    return done(false, result);
  }
};
export const GoogleStrategy = () => {
  passport.use('google', new Strategy(option, verify));
};
