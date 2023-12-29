import { describe, it, expect, expectTypeOf } from "vitest";
import supertest from "supertest";
import App from "../server";
import { type Cars, type ResponseCarPaginate } from "../types/type";

describe("test car module", () => {
  const server = new App().app;
  const id = "3fac8146-232b-4bed-a826-8f162fcc2fc7";
  const page = 2;
  const pageSize = 2;

  it("should be able to get all car", async () => {
    const response = await supertest(server).get("/cars");
    expect(response.statusCode).toBe(200);
    expectTypeOf(response.body.data).toMatchTypeOf<Cars[]>();
  });

  it("should be able to get car by id", async () => {
    const response = await supertest(server).get(`/cars/${id}`);
    expect(response.statusCode).toBe(200);
  });

  it("should be able to set page and pageSize when get all car", async () => {
    const response = await supertest(server).get(
      `/cars?page=${page}&pageSize=${pageSize}`
    );
    expect(response.statusCode).toBe(200);
    expectTypeOf(response.body).toMatchTypeOf<ResponseCarPaginate>();
    expectTypeOf(response.body.data).toMatchTypeOf<Cars[]>();
  });

  it("should be able to set query params when get all car ", async () => {
    const response = await supertest(server).get(
      `/cars?available=false&capacity=4&time=08:00`
    );
    expect(response.statusCode).toBe(200);
    expectTypeOf(response.body.data).toMatchTypeOf<Cars[]>();
  });
});
