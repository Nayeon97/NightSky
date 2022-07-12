import { atom, selector } from 'recoil';
import * as Api from './api';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState',
  default: [],
});

export const getUserSelector = selector({
  key: 'user/get',
  get: async () => {
    try {
      const data = await Api.get('user/info');
      return data.data;
    } catch (err) {
      throw new err();
    }
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});

export const challengeState = atom({
  key: 'challengeState',
  default: [],
});

export const randomListState = atom({
  key: 'randomListState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const emotionState = atom({
  key: 'emotionState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const activityState = atom({
  key: 'activityState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const fortuneState = atom({
  key: 'fortuneState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const openEmotionState = atom({
  key: 'openEmotionState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const countEmotionState = atom({
  key: 'countEmotion',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
