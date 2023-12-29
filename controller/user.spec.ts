import { describe, it, expect, expectTypeOf } from "vitest";
import supertest from "supertest";
import App from "../server";
import { loginAsAdmmin, loginAsUser } from "../util/testUtils";
import { type ResponseGetUser } from "../types/type";

describe("test user module", () => {
  const app = new App().app;
  let tokenUser: string = "";
  let tokenAdmin: string = "";

  it("should be able to login as admin before access to user module", async () => {
    const response = await loginAsAdmmin(supertest, app);
    expectTypeOf(response).toMatchTypeOf<string>();
    expect(response).toBeTruthy();
    tokenAdmin = response;
  });

  it("should be able to login as user before access to user module", async () => {
    const response = await loginAsUser(supertest, app);
    expectTypeOf(response).toMatchTypeOf<string>();
    expect(response).toBeTruthy();
    tokenUser = response;
  });

  it("admin should be able to get all user", async () => {
    const response = await supertest(app)
      .get("/users")
      .set({ Authorization: `Bearer ${tokenAdmin}` });
    expect(response.statusCode).toBe(200);
    expectTypeOf(response.body).toMatchTypeOf<ResponseGetUser>();
  });

  it("unauthorized user shouldnt be able to get all user", async () => {
    const response = await supertest(app)
      .get("/users")
      .set({ Authorization: `Bearer ${tokenUser}` });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Access Unauthorized");
    expectTypeOf(response.body.message).toMatchTypeOf<string>();
  });
});
