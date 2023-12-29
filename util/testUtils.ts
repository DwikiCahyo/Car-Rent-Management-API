import type supertest from "supertest";
import { type Application } from "express";

export async function loginAsAdmmin(
  st: typeof supertest,
  app: Application
): Promise<string> {
  const response = await st(app).post("/login").send({
    email: "superadmin@mail.com",
    password: "super123",
  });
  return response.body.data.token;
}

export async function loginAsUser(
  st: typeof supertest,
  app: Application
): Promise<string> {
  const response = await st(app).post("/login").send({
    email: "user1@mail.com",
    password: "user123",
  });
  return response.body.data.token;
}
