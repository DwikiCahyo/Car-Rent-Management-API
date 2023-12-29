import { describe, it, expect } from "vitest";

function sum(a: number, b: number): number {
  return a + b;
}

describe("test server", () => {
  it("should add add two number correctyly", () => {
    expect(sum(1, 1)).toBe(2);
    expect(sum(2, 3)).toBe(5);
  });
});
