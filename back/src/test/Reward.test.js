import request from "supertest";
import "../config/env.js";
import DiaryService from "../services/diaryService.js";
import app from "../app.js";
import { RewardService } from "../services/rewardService.js";

let cookie;
let cursor;

beforeAll(async () => {
  const result = await request(app)
    .post("/login/local")
    .send({ email: "hosahn@naver.com", pw: "1234" });
  cookie = result.headers["set-cookie"][0];
  return cookie;
});

describe("User Reward Information", () => {
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof RewardService.getUserRewards).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/reward/user").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/reward/user");
    expect(res.statusCode).toBe(404);
  });
});
