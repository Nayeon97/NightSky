import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//@ts-check
export default class Book {
  /**
   * - 태그 책을 생성하는 함수
   * @param {object} newBook
   * @param {string} newBook.name - 태그 이름
   * @param {number} newBook.user_id - 유저 고유 ID
   * @returns
   */
  static async createBook(newBook) {
    const book = await prisma.book.create({
      data: newBook,
    });
    return book;
  }

  /**
   * - 현재 존재하는 태그인지 체크하는 함수
   * @param {number} userId - 유저 고유 ID
   * @param {string} tag - 태그 이름
   * @returns
   */
  static async findTag(userId, tag) {
    const tagCheck = await prisma.book.findFirst({
      where: {
        user_id: +userId,
        name: tag,
      },
      select: {
        id: true,
      },
    });
    return tagCheck;
  }

  /**
   * - 현재 존재하는 북 리스트 반환
   * @param {number} userId - 유저 고유 ID
   * @returns
   */
  static async bookList(userId) {
    const list = await prisma.book.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        diary: {
          _count: 'desc',
        },
      },
    });
    return list;
  }

  static async bookDiarys(userId, tag) {
    const diarys = await prisma.book.findMany({
      where: {
        user_id: userId,
        name: tag,
      },
      select: {
        diary: {
          where: {
            deleted: false,
          },
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
    return diarys;
  }

  static async bookImage(userId, bookId, image) {
    const book = await prisma.book.update({
      where: {
        idUserId: { id: +bookId, user_id: +userId },
      },
      data: {
        image: image,
      },
    });
    return book;
  }

  static async bookColor(userId, bookId, color) {
    const book = await prisma.book.update({
      where: {
        idUserId: { id: +bookId, user_id: +userId },
      },
      data: {
        color: color,
      },
    });
    return book;
  }
}
