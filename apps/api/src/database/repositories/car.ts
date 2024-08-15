import type { Pool } from "pg";
import * as v from "valibot";
import type { GetCars } from "@/dto/cars";
import { CarBrandRepository } from "./car-brand";

export interface InsertableCar {
  brand: string;
  model: string;
  price: number;
  shop_id: number;
}

export class CarRepository {
  private carBrandRepository: CarBrandRepository;

  public static readonly carsSchema = v.array(
    v.object({
      id: v.number(),
      brand: v.string(),
      model: v.string(),
      price: v.number(),
      shop_name: v.string(),
      phone_number: v.pipe(v.string(), v.maxLength(15)),
    }),
  );

  constructor(private db: Pool) {
    this.carBrandRepository = new CarBrandRepository(db);
  }

  private assertGetCars(value: unknown): asserts value is GetCars {
    if (!Array.isArray(value)) {
      throw new Error("Invalid value");
    }

    try {
      v.parse(CarRepository.carsSchema, value);
    } catch (err) {
      throw new Error("Invalid get return schema");
    }
  }

  private assertInsertableCar(value: unknown): asserts value is InsertableCar {
    const schema = v.object({
      brand: v.string(),
      model: v.string(),
      price: v.number(),
      shop_id: v.number(),
    });

    try {
      v.parse(schema, value);
    } catch (err) {
      throw new Error("Invalid InsertableCar schema");
    }
  }

  private assertNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
      throw new Error("Invalid number");
    }
  }

  /**
   * Получение списка автомобилей.
   * Get a list of cars.
   * @param shopId - Идентификатор магазина. Shop id.
   * @returns Список автомобилей. List of cars.
   */
  public async get(shopId?: number): Promise<GetCars> {
    const { rows } = await this.db.query({
      name: "fetch-cars",
      text: `
        SELECT
          car.id, car_brand.name AS brand, car.model, car.price, shop.name AS shop_name, shop.phone_number
        FROM car
        JOIN shop ON shop.id = car.shop_id
        JOIN car_brand ON car_brand.id = car.brand_id
        WHERE $1::int IS NULL OR car.shop_id = $1
      `,
      values: [shopId],
    });
    this.assertGetCars(rows);

    return rows;
  }

  /**
   * Добавление автомобиля.
   * Add a car.
   * @param payload - Данные автомобиля. Car data.
   * @returns Идентификатор добавленного автомобиля. Id of the added car.
   */
  public async add(payload: InsertableCar): Promise<number> {
    try {
      this.assertInsertableCar(payload);
    } catch (err) {
      throw new Error("Invalid add payload");
    }

    try {
      const id = await this.carBrandRepository.getCarBrandId(payload.brand);

      const { rows } = await this.db.query({
        name: "add-car",
        text: `
          INSERT INTO car (brand_id, model, price, shop_id)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `,
        values: [id, payload.model, payload.price, payload.shop_id],
      });

      return rows[0].id as number;
    } catch (err) {
      // Происходит только при невалидном shop_id
      // 0nly happens with invalid shop_id
      throw new Error("Invalid add insertion");
    }
  }

  /**
   * Удаление автомобиля.
   * Delete a car.
   * @param id - Идентификатор автомобиля. Car id.
   * @returns Количество удаленных строк. Number of deleted rows.
   */
  public async delete(id: number): Promise<number> {
    this.assertNumber(id);
    const { rowCount } = await this.db.query({
      name: "delete-car",
      text: `
        DELETE FROM car
        WHERE id = $1
      `,
      values: [id],
    });
    this.assertNumber(rowCount);
    return rowCount;
  }
}
