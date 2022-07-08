import request from "supertest";
import "../config/env.js";
import { ChallengeService } from "../services/challengeService.js";
import app from "../app.js";
import { Challenge } from "../db/index.js";

let cookie;

beforeAll(async () => {
  const result = await request(app)
    .post("/login/local")
    .send({ email: "hosahn@naver.com", pw: "1234" });
  cookie = result.headers["set-cookie"][0];
  return cookie;
});

describe("Get Every Single of Challenges", () => {
  test("should have a ChallengeService.getChallengeLog function", async () => {
    jest.setTimeout(30000);
    expect(typeof ChallengeService.findAllChallenges).toBe("function");
  });
  test("should have a ChallengeService.findAllChallenges function", async () => {
    jest.setTimeout(30000);
    expect(typeof ChallengeService.getChallengeLog).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/challenge/all").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/challenge/all");
    expect(res.statusCode).toBe(404);
  });
});

describe("Start Challenge", () => {
  test("should have a ChallengeService.setChallenge is function", async () => {
    jest.setTimeout(30000);
    expect(typeof ChallengeService.setChallenge).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get("/challenge/start/5")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/challenge/start/5");
    expect(res.statusCode).toBe(404);
  });
});

describe("Start Challenge", () => {
  test("should have a ChallengeService.setChallenge is function", async () => {
    jest.setTimeout(30000);
    expect(typeof ChallengeService.setChallenge).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get("/challenge/start/5")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/challenge/start/5");
    expect(res.statusCode).toBe(404);
  });
  test("should return 200 response code with false statement", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get("/challenge/start/120")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(false);
  });
});

describe("Stop Challenge", () => {
  test("should have a ChallengeService.setChallenge is function", async () => {
    jest.setTimeout(30000);
    expect(typeof ChallengeService.stopChallenge).toBe("function");
  });
  test("should return 200 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get("/challenge/stop/5")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
  });
  test("should return 404 response code", async () => {
    jest.setTimeout(30000);
    const res = await request(app).get("/challenge/stop/5");
    expect(res.statusCode).toBe(404);
  });
  test("should return 200 response code with false statement", async () => {
    jest.setTimeout(30000);
    const res = await request(app)
      .get("/challenge/stop/120")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(0);
  });
});
