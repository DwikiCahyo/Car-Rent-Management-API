import { describe, it, expect, expectTypeOf } from "vitest";
import supertest from "supertest";
import App from "../server";
import { type ResponseLogin } from "../types/type";

describe("test auth module", () => {
  const app = new App().app;
  const randomNumber = Math.floor(Math.random() * 1000);
  let token = " ";

  it("should be able to register user", async () => {
    const response = await supertest(app)
      .post("/register")
      .send({
        email: `test${randomNumber}@mail.com`,
        password: "test123",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Success create account");
  });

  it("should not  able to register if email already exists", async () => {
    const response = await supertest(app).post("/register").send({
      email: `user1@mail.com`,
      password: "user123",
    });
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Email already exist");
  });

  it("should be able to login", async () => {
    const response = await supertest(app).post("/login").send({
      email: `user1@mail.com`,
      password: "user123",
    });
    expect(response.statusCode).toBe(200);
    expectTypeOf(response.body.data).toMatchTypeOf<ResponseLogin>();
    token = response.body.data.token;
  });

  it("should not able to login if email is not register", async () => {
    const response = await supertest(app).post("/login").send({
      email: `testMlayu@mail.com`,
      password: "test123",
    });
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("User not found, please register");
  });

  it("should not able to login if password is not match", async () => {
    const response = await supertest(app).post("/login").send({
      email: `user1@mail.com`,
      password: " ",
    });
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Wrong Credentials");
  });

  it("should be able to check user information when user already login", async () => {
    const response = await supertest(app)
      .get("/whoami")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.statusCode).toBe(200);
  });

  it("should not able to check user information when user dont have credentials", async () => {
    token = " ";
    const response = await supertest(app)
      .get("/whoami")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should not able to check user information when user credentials dont match", async () => {
    token = "tokenngawurikilur";
    const response = await supertest(app)
      .get("/whoami")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe("Invalid Token");
  });
});
