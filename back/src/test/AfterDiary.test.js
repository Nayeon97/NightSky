import request from "supertest";
import "../config/env.js";
import DiaryService from "../services/diaryService.js";
import app from "../app.js";
import { Activity } from "../db/index.js";
import { Fortune } from "../db/index.js";

const emotionMock = {
  emotion: "행복",
};
let cookie;

beforeAll(async () => {
  const result = await request(app)
    .post("/login/local")
    .send({ email: "hosahn@naver.com", pw: "1234" });
  cookie = result.headers["set-cookie"][0];
  return cookie;
});

describe("Activity Information", () => {
  test("should have Activity.findMusic function", async () => {
    jest.setTimeout(30000);
    expect(typeof Activity.findMusic).toBe("function");
  });
  test("should have Activity.findActivity function", async () => {
    jest.setTimeout(30000);
    expect(typeof Activity.findActivity).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .post("/confirmed/submit")
      .send(emotionMock)
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code(Unauthenticated)", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/confirmed/submit");
    expect(res.statusCode).toBe(404);
  });
});

describe("Fortune", () => {
  test("should have Fortune.getFortune function", async () => {
    jest.setTimeout(30000);
    expect(typeof Fortune.getFortune).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get("/confirmed/fortune")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code(Unauthenticated)", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/confirmed/fortune");
    expect(res.statusCode).toBe(404);
  });
});
