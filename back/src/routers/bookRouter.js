import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import BookService from '../services/bookService.js';
import * as status from '../utils/status.js';
const bookRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Book
 *    description: 북 태그 관련 API
 */

/**
 * @swagger
 * /book/list:
 *   get:
 *     tags: [Book]
 *     description: |
 *       * 유저가 가지고 있는 북 태그를 일기가 많은 순으로 모아서 보여주는 API
 *       ```js
 *       [
 *        {
 *            "id": 5,
 *            "user_id": 2,
 *            "inserted_at": "2022-06-25T14:35:46.000Z",
 *            "updated_at": "2022-06-25T14:35:46.000Z",
 *            "image": "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/defaultImage/nightSky.jpg",
 *            "color": "#d0ebff",
 *            "name": "테스트"
 *        },
 *        {
 *            "id": 6,
 *            "user_id": 2,
 *            "inserted_at": "2022-06-25T14:37:46.000Z",
 *            "updated_at": "2022-06-25T14:37:46.000Z",
 *            "image": "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/defaultImage/nightSky.jpg",
 *            "color": "#d0ebff",
 *            "name": "테스트2"
 *        },
 *        {
 *            "id": 4,
 *            "user_id": 2,
 *            "inserted_at": "2022-06-25T07:58:21.000Z",
 *            "updated_at": "2022-06-25T14:34:15.000Z",
 *            "image": "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/defaultImage/nightSky.jpg",
 *            "color": "#d0ebff",
 *            "name": "테스트3"
 *        }
 *       ]
 *       ```
 *     produces:
 *     - application/json
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 5
 *                   user_id:
 *                     type: number
 *                     example: 2
 *                   inserted_at:
 *                     type: Date
 *                     example: 2022-06-25T14:35:46.000Z
 *                   updated_at:
 *                     type: Date
 *                     example: 2022-06-25T14:35:46.000Z
 *                   image:
 *                     type: string
 *                     example: https://ai-project-last.s3.ap-northeast-2.amazonaws.com/defaultImage/nightSky.jpg
 *                   color:
 *                     type: string
 *                     example: "#d0ebff"
 *                   name:
 *                     type: string
 *                     example: 테스트
 */
bookRouter.get('/list', loginRequired, async (req, res, next) => {
  const { id: userId } = req.user;
  const list = await BookService.bookList(userId);
  res.status(status.STATUS_200_OK).send(list);
});

/**
 * @swagger
 * /book/diarys:
 *   get:
 *     tags: [Book]
 *     description: |
 *       * 해당 북 태그에 존재하는 다이어리를 가져오는 API
 *       * 쿼리로 태그 이름을 보내주면 그 태그에 속하는 북태그 안 다이어리를 반환해준다!
 *       * ex) ``/diarys?tag=테스트``
 *       ```js
 *       [
 *        {
 *            "id": 30,
 *            "user_id": 2,
 *            "text": "✏️일이삼사오",
 *            "title": "12346",
 *            "tag": "테스트",
 *            "date": "2022-06-25T14:38:25.000Z",
 *            "view": 1,
 *            "deleted": false,
 *            "emotion": "공부",
 *            "book_id": 5
 *        },
 *        {
 *            "id": 25,
 *            "user_id": 2,
 *            "text": "✏️일이삼사오",
 *            "title": "12346",
 *            "tag": "테스트",
 *            "date": "2022-06-25T14:36:49.000Z",
 *            "view": 1,
 *            "deleted": false,
 *            "emotion": "공부",
 *            "book_id": 5
 *        }
 *       ]
 *       ```
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: query
 *       name: tag
 *       example: 테스트
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 37
 *                   user_id:
 *                     type: number
 *                     example: 10
 *                   text:
 *                     type: string
 *                     example: "일기 내용 입니다."
 *                   title:
 *                     type: string
 *                     example: "제목"
 *                   tag:
 *                     type: string
 *                     example: "공부"
 *                   date:
 *                     type: Date
 *                     example: "2022-06-07T07:21:56.000Z"
 *                   view:
 *                     type: number
 *                     example: 1
 *                   deleted:
 *                     type: boolean
 *                     example: false
 *                   emotion:
 *                     type: string
 *                     example: 기쁨
 *                   book_id:
 *                     type: number
 *                     example: 5
 */
bookRouter.get('/diarys', loginRequired, async (req, res, next) => {
  const { tag } = req.query;
  const { id: userId } = req.user;
  const list = await BookService.bookDiarys(userId, tag);
  res.status(status.STATUS_200_OK).send(list);
});

/**
 * @swagger
 * /book/images/{id}:
 *   post:
 *     tags: [Book]
 *     description: |
 *       * 북태그 이미지를 업데이트 하는 API 입니다.
 *       * 요청 url 은 ``/book/images/:id`` 로서 뒤에 ``업데이트할 북 태그의 ID`` 를 작성해주면 됩니다.
 *       > Body 에는 바꿀 이미지에 대한 url 을 image에 넣어주시면 됩니다.
 *       ---
 *       * ``요청 Body``
 *       ```js
 *       {
 *           "image": "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1656170840145%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5.jpeg"
 *       }
 *       ```
 *       ---
 *       * ``응답 값``
 *       ```js
 *       {
 *        "id": 5,
 *        "user_id": 2,
 *        "inserted_at": "2022-06-25T14:35:46.000Z",
 *        "updated_at": "2022-06-26T05:21:05.000Z",
 *        "image": "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1656170840145%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5.jpeg",
 *        "color": "2f323a",
 *        "name": "테스트"
 *       }
 *       ```
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1656170840145%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5.jpeg"
 *                 description: "변경할 이미지 url"
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 5
 *                 user_id:
 *                   type: number
 *                   example: 2
 *                 inserted_at:
 *                   type: Date
 *                   example: 2022-06-25T14:35:46.000Z
 *                 updated_at:
 *                   type: Date
 *                   example: 2022-06-26T05:21:05.000Z
 *                 image:
 *                   type: string
 *                   example: "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1656170840145%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5.jpeg"
 *                 color:
 *                   type: string
 *                   example: "2f323a"
 *                 name:
 *                   type: number
 *                   example: 테스트
 */
bookRouter.post('/images/:id', loginRequired, async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: bookId } = req.params;
  const { image } = req.body;
  try {
    const book = await BookService.bookImage(userId, bookId, image);
    res.status(status.STATUS_200_OK).send(book);
  } catch (error) {
    const err = new Error(`이미지 업로드 에러 : ${error}`);
    next(err);
  }
});

/**
 * @swagger
 * /book/colors/{id}:
 *   post:
 *     tags: [Book]
 *     description: |
 *       * 북태그 색상을 업데이트 하는 API 입니다.
 *       * 요청 url 은 ``/book/colors/:id`` 로서 뒤에 ``업데이트할 북 태그의 ID`` 를 작성해주면 됩니다.
 *       > Body 에는 바꿀 색상에 대한 값을 color 에 넣어주시면 됩니다.
 *       ---
 *       * ``요청 Body``
 *       ```js
 *       {
 *           "color": "2f323a"
 *       }
 *       ```
 *       ---
 *       * ``응답 값``
 *       ```js
 *       {
 *        "id": 5,
 *        "user_id": 2,
 *        "inserted_at": "2022-06-25T14:35:46.000Z",
 *        "updated_at": "2022-06-26T05:21:05.000Z",
 *        "image": "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1656170840145%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5.jpeg",
 *        "color": "2f323a",
 *        "name": "테스트"
 *       }
 *       ```
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               color:
 *                 type: string
 *                 example: "2f323a"
 *                 description: "변경할 색상 코드"
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 5
 *                 user_id:
 *                   type: number
 *                   example: 2
 *                 inserted_at:
 *                   type: Date
 *                   example: 2022-06-25T14:35:46.000Z
 *                 updated_at:
 *                   type: Date
 *                   example: 2022-06-26T05:21:05.000Z
 *                 image:
 *                   type: string
 *                   example: "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1656170840145%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A1%E1%84%8C%E1%85%B5.jpeg"
 *                 color:
 *                   type: string
 *                   example: "2f323a"
 *                 name:
 *                   type: number
 *                   example: 테스트
 */
bookRouter.post('/colors/:id', loginRequired, async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: bookId } = req.params;
  const { color } = req.body;
  try {
    const book = await BookService.bookColor(userId, bookId, color);
    res.status(status.STATUS_200_OK).send(book);
  } catch (error) {
    const err = new Error(`색 변경 에러 : ${error}`);
    next(err);
  }
});

export default bookRouter;
