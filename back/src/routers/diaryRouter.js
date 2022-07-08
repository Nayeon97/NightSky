import { Router } from "express";
import DiaryService from "../services/diaryService.js";
import { validate } from "../middlewares/validator.js";
import { check, param, body, query } from "express-validator";
import * as status from "../utils/status.js";
import loginRequired from "../middlewares/loginRequired.js";
const diaryRouter = Router();

/**
 *  @swagger
 *  tags:
 *    name: Diary
 *    description: 일기장 관련 API
 */

/**
 * @swagger
 * /diary:
 *   post:
 *     tags: [Diary]
 *     description: 일기 작성 API
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               text:
 *                 type: string
 *                 example: "일기 내용 입니다."
 *                 description: "작성한 일기 내용"
 *               title:
 *                 type: string
 *                 example: "제목"
 *                 description: "작성한 일기 제목"
 *               tag:
 *                 type: string
 *                 example: "공부"
 *                 description: "일기 주제 태그"
 *     responses:
 *       '201':
 *         description: "Diary 생성 완료"
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 4
 *                 userId:
 *                   type: number
 *                   example: 1
 *                 text:
 *                   type: string
 *                   example: "일기 내용 입니다."
 *                 title:
 *                   type: string
 *                   example: "제목"
 *                 tag:
 *                   type: string
 *                   example: "공부"
 *                 date:
 *                   type: Date
 *                   example: "2022-06-07T07:21:56.000Z"
 *                 view:
 *                   type: number
 *                   example: 1
 *                   deleted:
 *                     type: boolean
 *                     example: false
 */
diaryRouter.post(
  "/",
  loginRequired,
  [
    body("title", "제목은 필수로 입력해야 합니다.").exists().bail(),
    body("text", "일기 내용은 필수로 적어주셔야 합니다.").exists().bail(),
    body("emotion", "감정은 필수로 들어가야 합니다.").exists().bail(),
    validate,
  ],
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const data = { userId, ...req.body };
      if (await DiaryService.challengeCheck(userId)) {
        await DiaryService.check(userId);
      }
      const body = await DiaryService.create(data);
      return res.status(status.STATUS_201_CREATED).json(body);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * @swagger
 * /diary/{id}:
 *   delete:
 *     tags: [Diary]
 *     description: 다이어리 삭제
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       example: 2
 *     responses:
 *       '204':
 *         description: "삭제 성공"
 */
diaryRouter.delete(
  "/:id",
  loginRequired,
  [
    param("id")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Diary ID 값을 path로 넣어주세요.")
      .bail()
      .toInt()
      .isInt()
      .withMessage("Diary ID 값은 Type이 Number 이여야 합니다.")
      .bail()
      .custom(async (value) => {
        const diary = await DiaryService.find(value);
        if (!diary) {
          throw new Error("Diary가 존재하지 않습니다.", 400);
        }
      }),
    validate,
  ],
  async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    const body = await DiaryService.delete(id, userId);
    return res.status(status.STATUS_204_NO_RESOURCE).end();
  }
);

/**
 * @swagger
 * /diary/list:
 *   get:
 *     tags: [Diary]
 *     description: |
 *       * 유저가 작성한 일기 조회
 *       * 쿼리를 주지 않고 ``/diary/list``로 요청이 오면 가장 최근에 들어온 일기부터 순서대로 5개의 값과 cursor 값을 준다.
 *       ```js
 *       [
 *         {
 *             "id": 474,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:18.000Z",
 *             "view": 1
 *         },
 *         {
 *             "id": 473,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:17.000Z",
 *             "view": 1
 *         },
 *         {
 *             "id": 472,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:17.000Z",
 *             "view": 1
 *         },
 *         {
 *             "id": 471,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:16.000Z",
 *             "view": 1
 *         },
 *         {
 *             "cursor": 471
 *         }
 *       ]
 *       ```
 *       그 후 무한 스크롤을 통해 새로운 리스트가 필요할 때 위에 받았던 cursor 값을 쿼리로 전달해주면 됩니다!
 *       * ``/diray/list/?cursor=471``
 *       ```js
 *       [
 *         {
 *             "id": 470,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:16.000Z",
 *             "view": 1
 *         },
 *         {
 *             "id": 469,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:15.000Z",
 *             "view": 1
 *         },
 *         {
 *             "id": 468,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:15.000Z",
 *             "view": 1
 *         },
 *         {
 *             "id": 467,
 *             "title": "제목",
 *             "text": "이건 일기 내용",
 *             "tag": "공부",
 *             "date": "2022-06-18T06:14:15.000Z",
 *             "view": 1
 *         },
 *         {
 *             "cursor": 467
 *         }
 *       ]
 *       ```
 *     produces:
 *     - application/json
 *     responses:
 *       '200':
 *         description: "유저가 작성한 일기 조회 성공"
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
 */
diaryRouter.get("/list", loginRequired, async (req, res, next) => {
  const userId = req.user.id;
  const { cursor } = req.query;
  if (cursor) {
    const body = await DiaryService.secondReadList(userId, cursor);
    return res.status(status.STATUS_200_OK).send(body);
  }
  const body = await DiaryService.readList(userId);
  return res.status(status.STATUS_200_OK).send(body);
});

/**
 * @swagger
 * /diary/random/list:
 *   get:
 *     tags: [Diary]
 *     description: 유저가 작성한 일기 조회
 *     produces:
 *     - application/json
 *     responses:
 *       '200':
 *         summary: "랜덤한 일기 3개를 반환 합니다."
 *         description: |
 *           반환 형식
 *           ```js
 *           [
 *            {
 *            "id": 1,
 *            "text": "일기 내용",
 *            "title": "일기 제목",
 *            "tag": "공부",
 *            "date": "2022-06-09T10:45:55+00:00",
 *            "view": 4,
 *            }
 *           ]
 *           ```
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
 */
diaryRouter.get("/random/list", loginRequired, async (req, res, next) => {
  const userId = req.user.id;
  const diarys = await DiaryService.randomDiarys(userId);
  return res.status(status.STATUS_200_OK).send(diarys);
});
/**
 * @swagger
 * /diary/list:
 *   get:
 *     tags: [Diary]
 *     description: |
 *       * 일기를 검색하는 API 입니다!
 *       * query 값에 따라 반환하는 값이 달라집니다.
 *       * ex) ``/diary/search?title=일기`` 는 일기의 제목을 검색
 *       * ex) ``/diary/search?text=일기`` 는 일기의 내용을 검색
 *       * ex) ``/diary/search?tag=일기`` 는 일기의 태그를 검색
 *       * ex) ``/diary/search?all=일기`` 는 일기 통합 검색
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: query
 *       name: title
 *       example: 제목
 *     - in: query
 *       name: text
 *       example: 내용
 *     - in: query
 *       name: tag
 *       example: 태그
 *     - in: query
 *       name: all
 *       example: 모두
 *     responses:
 *       '200':
 *         description: "검색 성공"
 */
diaryRouter.get("/search", loginRequired, async (req, res, next) => {
  const userId = req.user.id;
  const search = Object.keys(req.query)[0];
  const word = req.query[search];
  const words = ["title", "text", "tag", "all"];
  if (!words.includes(search)) {
    const error = new Error("올바른 쿼리 값을 입력해주세요.");
    return next(error);
  }
  if (typeof word == "undefined" || word == null) {
    const error = new Error("올바른 쿼리 값을 입력해주세요.");
    return next(error);
  }
  if (word.length === 0) {
    const error = new Error("검색어를 한 글자 이상 입력해주세요!");
    return next(error);
  }
  const result = await DiaryService.searchList(userId, search, word);
  res.status(status.STATUS_200_OK).send(result);
});

/**
 * @swagger
 * /diary/{id}:
 *   get:
 *     tags: [Diary]
 *     description: 다이어리 개별 조회
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       example: 2
 *     responses:
 *       '200':
 *         description: "다이어리 개별 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 37
 *                 user_id:
 *                   type: number
 *                   example: 10
 *                 text:
 *                   type: string
 *                   example: "일기 내용 입니다."
 *                 title:
 *                   type: string
 *                   example: "제목"
 *                 tag:
 *                   type: string
 *                   example: "공부"
 *                 date:
 *                   type: Date
 *                   example: "2022-06-07T07:21:56.000Z"
 *                 view:
 *                   type: number
 *                   example: 1
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       image:
 *                         type: string
 *                         example:  "https://ai-project-last.s3.ap-northeast-2.amazonaws.com/diary/1654656839850docker.png"
 */
diaryRouter.get(
  "/:id",
  loginRequired,
  [
    param("id")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Diary ID 값을 path로 넣어주세요.")
      .bail()
      .toInt()
      .isInt()
      .withMessage("Diary ID 값은 Type이 Number 이여야 합니다.")
      .bail()
      .custom(async (value) => {
        const diary = await DiaryService.find(value);
        if (!diary) {
          throw new Error("Diary가 존재하지 않습니다.");
        }
      }),
    validate,
  ],
  async (req, res, next) => {
    const { id } = req.params;
    const body = await DiaryService.read(id);
    return res.status(status.STATUS_200_OK).send(body);
  }
);
export default diaryRouter;
