import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//@ts-check
export default class Emotion {
  /**
   * - 감정을 저장하는 함수
   * @param {number} userId - 현재 로그인한 유저의 고유 ID
   * @param {number} diaryId - 감정분석 할 일기의 고유 ID
   * @param {string} emotion - 일기를 감정분석한 결과로 나온 감정
   * @returns {Promise<{user_id: number, diary_id: number, emotion: string, date:Date}>}
   */
  static async create(newEmotion) {
    const createEmotion = await prisma.emotion.create({
      data: newEmotion,
    });
    return createEmotion;
  }
}
