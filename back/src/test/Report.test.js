import request from "supertest";
import "../config/env.js";
import DiaryService from "../services/diaryService.js";
import app from "../app.js";
import { Report } from "../db/index.js";

let cookie;
let cursor;

beforeAll(async () => {
  const result = await request(app)
    .post("/login/local")
    .send({ email: "hosahn@naver.com", pw: "1234" });
  cookie = result.headers["set-cookie"][0];
  return cookie;
});

describe("Report Function", () => {
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof Report.findMonthlyEmotion).toBe("function");
  });
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof Report.findWhen).toBe("function");
  });
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof Report.findAllUserTags).toBe("function");
  });
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof Report.findTags).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/report").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/report");
    expect(res.statusCode).toBe(404);
  });
});
