import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();
//@ts-check
export default class Diary {
  /**
   * - 일기 생성 Model 함수
   * @param {object} newDiary
   * @returns {Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async create(newDiary) {
    const createDiary = await prisma.diary.create({
      data: newDiary,
      select: {
        id: true,
        title: true,
        text: true,
        tag: true,
        emotion: true,
      },
    });
    return createDiary;
  }

  /**
   * - 일기 삭제 Model 함수
   * @param {number} id - 삭제할 ID 값
   * @returns {Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async delete(id) {
    const deleteDiary = await prisma.diary.update({
      where: {
        id: +id,
      },
      data: {
        deleted: true,
        book_id: null,
      },
    });
    return deleteDiary;
  }

  /**
   * - 일기 상세 조회 Model 함수
   * @param {number} id - 조회할 다이어리 ID
   * @returns {Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async read(id) {
    const updatePosts = await prisma.diary.update({
      where: {
        id: +id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });
    const readDiary = await prisma.diary.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        title: true,
        text: true,
        tag: true,
        date: true,
        view: true,
        emotion: true,
      },
    });
    return readDiary;
  }

  /**
   * - 일기 목록 첫 조회 Model 함수
   * @param {number} userId - 다이어리 목록을 조회할 유저 ID
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async readList(userId) {
    const diaryList = await prisma.diary.findMany({
      take: 10,
      where: {
        user_id: +userId,
        deleted: false,
      },
      select: {
        id: true,
        title: true,
        text: true,
        tag: true,
        date: true,
        view: true,
        emotion: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return diaryList;
  }
  /**
   * - 일기 목록 cursor 조회 Model 함수
   * @param {number} userId - 다이어리 목록을 조회할 유저 ID
   * @param {number} cursor - 현재 가르키는 다이어리 cursor
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async secondReadList(userId, cursor) {
    const diaryList = await prisma.diary.findMany({
      take: 10,
      skip: 1,
      cursor: {
        id: +cursor,
      },
      where: {
        user_id: +userId,
        deleted: false,
      },
      select: {
        id: true,
        title: true,
        text: true,
        tag: true,
        date: true,
        view: true,
        emotion: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return diaryList;
  }

  /**
   * - 일기가 존재하는지 확인하는 함수
   * @param {number} id - Diary의 고유 id
   * @returns {Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async find(id) {
    const diary = await prisma.diary.findFirst({
      where: {
        id: +id,
        deleted: false,
      },
    });
    return diary;
  }

  /**
   * - 유저가 챌린지에 참여하고 있을 경우, 그날 글을 썼는지 체크하는 업데이트 함수
   * @param {number} userId - diary를 작성한 user_id
   */
  static async check(userId) {
    const check = await prisma.user_challenge.updateMany({
      where: {
        user_id: +userId,
      },
      data: {
        is_broken: false,
      },
    });
    return check;
  }

  /**
   * - 유저가 현재 진행 중인 챌린지가 있는지 검사하는 함수
   * @param {number} userId - diary를 작성한 user_id
   */
  static async challengeCheck(userId) {
    const challenge = await prisma.user_challenge.findFirst({
      where: {
        user_id: +userId,
      },
    });
    return challenge;
  }

  /**
   * - 랜덤한 일기 3개를 반환합니다.
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async randomDiarys(userId) {
    const diarys =
      await prisma.$queryRaw`SELECT * FROM diary WHERE deleted=0 AND user_id=${userId} ORDER BY RAND() limit 3;`;
    return diarys;
  }

  /**
   * - 일기 제목으로 검색하는 함수
   * @param {number} userId - 유저 고유 ID
   * @param {string} title  - 검색할 일기 제목
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number, deleted: boolean}>}
   */
  static async searchTitle(userId, title) {
    const diarys = await prisma.diary.findMany({
      where: {
        user_id: +userId,
        title: {
          contains: title,
        },
        deleted: false,
      },
    });
    return diarys;
  }
  /**
   * - 일기 내용으로 검색하는 함수
   * @param {number} userId - 유저 고유 ID
   * @param {string} text - 검색할 일기 내용
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number, deleted: boolean}>}
   */
  static async searchText(userId, text) {
    const diarys = await prisma.diary.findMany({
      where: {
        user_id: +userId,
        text: {
          contains: text,
        },
        deleted: false,
      },
    });
    return diarys;
  }

  /**
   * - 일기 태그를 검색하는 함수
   * @param {number} userId - 유저 고유 ID
   * @param {string} tag - 검색할 태그 내용
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async searchTag(userId, tag) {
    const diarys = await prisma.diary.findMany({
      where: {
        user_id: userId,
        tag: {
          contains: tag,
        },
        deleted: false,
      },
    });
    return diarys;
  }

  /**
   * - 일기 통합 검색 기능
   * @param {number} userId - 유저 고유 ID
   * @param {string} word - 검색할 내용
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async searchAll(userId, word) {
    const diarys = await prisma.diary.findMany({
      where: {
        user_id: userId,
        OR: [
          {
            title: {
              contains: word,
            },
          },
          {
            text: {
              contains: word,
            },
          },
          {
            tag: {
              contains: word,
            },
          },
        ],
        deleted: false,
      },
    });
    return diarys;
  }
}
