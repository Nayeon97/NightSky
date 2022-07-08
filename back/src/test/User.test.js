import request from "supertest";
import "../config/env.js";
import { User } from "../db/index.js";
import app from "../app.js";
import { UserService } from "../services/userService.js";

const signUpMock = {
  email: "hosahn1@naver.com",
  pw: "1234",
  name: "호산",
};
const notPossible = {
  email: "hosahn@naver.com",
  pw: "1234",
  name: "호산",
};
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
    expect(typeof UserService.userInfo).toBe("function");
  });
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof User.createUser).toBe("function");
  });
  test("should have a DiaryService.create function", async () => {
    jest.setTimeout(30000);
    expect(typeof User.checkUser).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/user/info").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/user/info");
    expect(res.statusCode).toBe(404);
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).post("/user/signup").send(signUpMock);
    expect(res.statusCode).toBe(200);
  });
  test("should return 200 response code with false", async () => {
    jest.setTimeout(30000);
    const res = await request(app).post("/user/signup").send(notPossible);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(false);
  });
});
