import supertest from "supertest";
import * as v from "valibot";
// Используем .. вместо @, потому что тестовая библиотека не поддерживает алиасы
// Using .. instead of @ because test library does not support aliases
import { CarRepository } from "../database/repositories/car";
import { ShopRepository } from "../database/repositories/shop";
import { createServer } from "../server";

const app = createServer();
const agent = supertest(app);

describe("GET Routes", () => {
  it("GET Car returns cars", () => {
    void agent
      .get("/v1/car")
      .expect(200)
      .then((res) => {
        const result = v.safeParse(CarRepository.carsSchema, res.body);
        expect(result.success).toEqual(true);
      });
  });

  it("GET Shop returns shops", () => {
    void agent
      .get("/v1/shop")
      .expect(200)
      .then((res) => {
        const result = v.safeParse(ShopRepository.shopsSchema, res.body);
        expect(result.success).toEqual(true);
      });
  });
});
