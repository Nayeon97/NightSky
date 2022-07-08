import { Diary, User, Book } from '../db/index.js';
//@ts-check
export default class DiaryService {
  /**
   * - 일기 생성 Service 함수
   * @param {object} body - router에서 보내준 객체
   * @param {number} body.userId - 일기를 작성한 유저 ID
   * @param {string} body.text - 일기 내용
   * @param {string} body.title - 일기 제목
   * @param {string} body.tag - 일기 태그 [ 주제 ]
   * @param {string} body.emotion - 일기 감정
   * @returns {Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async create({ userId, text, title, tag, emotion }) {
    const { daily_check: check } = await User.dailyCheck(userId);
    if (check) {
      throw Error('일기는 하루에 한번만 작성 가능합니다.');
    }
    try {
      const TagCheck = await Book.findTag(userId, tag);
      if (TagCheck == null) {
        const newBook = {
          user_id: +userId,
          name: tag,
        };
        const book = await Book.createBook(newBook);
        const newDiary = {
          user_id: +userId,
          text,
          title,
          tag,
          emotion,
          book_id: book.id,
        };
        const body = await Diary.create(newDiary);
        const daily = await User.dailyUpdate(userId);
        return body;
      }
      const { id: bookId } = TagCheck;
      const newDiary = {
        user_id: +userId,
        text,
        title,
        tag,
        emotion,
        book_id: bookId,
      };
      const body = await Diary.create(newDiary);
      const daily = await User.dailyUpdate(userId);
      return body;
    } catch (error) {
      throw Error(`일기 작성 에러:${error.message}`);
    }
  }
  /**
   * - 일기 삭제 Service 함수
   * @param {number} id - 삭제할 ID 값
   */
  static async delete(id) {
    const body = await Diary.delete(id);
    return body;
  }
  /**
   * - 일기 개별 조회 Service 함수
   * @param {number} id - 조회할 다이어리 ID 값
   * @returns {Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async read(id) {
    const body = await Diary.read(id);
    return body;
  }

  /**
   *  - 일기 목록 첫 조회 Service 함수
   * @param {number} userId - 유저 고유 ID
   * @returns {Array.Promise<{id:number, user_id:number, text: string, title: string, tag: string, date: Date, view: number,}>}
   */
  static async readList(userId) {
    const body = await Diary.readList(userId);
    if (body.length > 0) {
      body.push({ cursor: body[body.length - 1].id });
    }
    return body;
  }

  /**
   * - 일기 목록 커서 조회 Service 함수
   * @param {number} userId - 유저 고유 ID
   * @param {number} cursor - 커서 위치
   * @returns
   */
  static async secondReadList(userId, cursor) {
    const body = await Diary.secondReadList(userId, cursor);
    if (body.length >= 1) {
      body.push({ cursor: body[body.length - 1].id });
    }
    return body;
  }

  /**
   *  - 일기가 존재하는지 확인하는 함수
   * @param {number} id - 다이어리 고유 ID
   */
  static async find(id) {
    const diary = await Diary.find(id);
    return diary;
  }

  /**
   * - 유저가 현재 진행 중인 챌린지가 있는지 검사하는 함수
   * @param {number} userId - diary를 작성한 user_id
   */
  static async challengeCheck(userId) {
    const challenge = await Diary.challengeCheck(userId);
    return challenge;
  }
  /**
   * - 유저가 챌린지 참여하고 있을 때 그날 글을 작성했다고 체크 해주는 함수
   * @param {number} userId - diary를 작성한 user_id
   */
  static async check(userId) {
    const check = await Diary.check(userId);
    return check;
  }

  /**
   * - 유저가 가진 일기 중 랜덤으로 3개를 보여주는 함수
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async randomDiarys(userId) {
    const diarys = await Diary.randomDiarys(userId);
    return diarys;
  }

  /**
   * - 일기를 검색하는 함수
   * @param {number} userId - 유저 고유 ID
   * @param {string} search  -검색할 위치
   * @param {string} word  - 검색할 내용
   * @returns {Array.Promise<{id:number, text: string, title: string, tag: string, date: Date, view: number}>}
   */
  static async searchList(userId, search, word) {
    switch (search) {
      case 'title':
        return await Diary.searchTitle(userId, word);
      case 'text':
        return await Diary.searchText(userId, word);
      case 'tag':
        return await Diary.searchTag(userId, word);
      case 'all':
        return await Diary.searchAll(userId, word);
    }
  }
}
