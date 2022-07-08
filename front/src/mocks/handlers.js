// src/mocks/handlers.js
import { rest } from 'msw';

const imageUrl =
  'https://user-images.githubusercontent.com/37766175/121808323-d8d41000-cc92-11eb-9117-b92a435c9b43.png';

export const handlers = [
  rest.get('https://12team.com/user/1234', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: '12팀',
        inserted_at: '2022-03-01',
      })
    );
  }),

  rest.get('https://12team.com/userChallenge/1234', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        challengeName: '매일 쓰기',
        start_date: '2022-03-27',
        is_completed: false,
        is_broken: false,
      })
    );
  }),

  rest.get('https://12team.com/challengeList', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        challengeName: '매일 쓰기',
        duraction: 50,
        description: '50일동안 매일 쓰는 일기',
        reward: 5,
      })
    );
  }),

  rest.get('https://12team.com/challenge', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        log: {
          completed: [true, false],
          challenge: ['5일 챌린지', '50일 챌린지', '20일챌린지', '30일챌린지'],
          isRunning: true,
        },
        challenge: [
          {
            id: 4,
            name: '5일 챌린지',
            duration: 5,
            description: '5일간 매일 일기 하나',
            reward: null,
            inserted_at: null,
            type: 1,
            descriptionOne: null,
            descriptionTwo: null,
            subtitle: null,
          },
          {
            id: 5,
            name: '50일 챌린지',
            duration: 50,
            description: '50일간 매일 일기 하나',
            reward: null,
            inserted_at: null,
            type: 1,
            descriptionOne: null,
            descriptionTwo: null,
            subtitle: null,
          },
        ],
      })
    );
  }),

  rest.post('https://12team.com/userDiary/img', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('https://12team.com/userDiary/img', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ imageUrl: imageUrl }));
  }),
];
