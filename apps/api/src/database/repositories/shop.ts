import type { Pool } from "pg";
import * as v from "valibot";
import type { GetShops } from "@/dto/shops";

export interface InsertableShop {
  name: string;
  phone_number: string;
}

export class ShopRepository {
  public static readonly shopsSchema = v.array(
    v.object({
      id: v.number(),
      name: v.string(),
      phone_number: v.pipe(v.string(), v.maxLength(15)),
      // Не использую CarRepository.carsSchema чтобы не дублировать запросы связанные с магазинами
      // Not using CarRepository.carsSchema to avoid duplicating shop-related queries
      cars: v.nullable(
        v.array(
          v.object({
            id: v.number(),
            brand: v.string(),
            model: v.string(),
            price: v.number(),
          }),
        ),
      ),
    }),
  );

  constructor(private db: Pool) {}

  private assertGetShops(value: unknown): asserts value is GetShops {
    if (!Array.isArray(value)) {
      throw new Error("Invalid value");
    }

    try {
      v.parse(ShopRepository.shopsSchema, value);
    } catch (err) {
      throw new Error("Invalid get return schema");
    }
  }

  private assertInsertableShop(
    value: unknown,
  ): asserts value is InsertableShop {
    const schema = v.object({
      name: v.string(),
      phone_number: v.pipe(v.string(), v.maxLength(15)),
    });

    try {
      v.parse(schema, value);
    } catch (err) {
      throw new Error("Invalid InsertableShop schema");
    }
  }

  private assertNumber(value: unknown): asserts value is number {
    if (typeof value !== "number") {
      throw new Error("Invalid number");
    }
  }

  /**
   * Получение списка магазинов.
   * Get a list of shops.
   * @returns Список магазинов. List of shops.
   */
  public async get(): Promise<GetShops> {
    const { rows } = await this.db.query({
      name: "fetch-shops",
      text: `
        SELECT
          id, name, phone_number,
          (
            SELECT json_agg(json_build_object('id', car.id, 'brand', car_brand.name, 'model', car.model, 'price', car.price))
            FROM car
            JOIN car_brand ON car_brand.id = car.brand_id
            WHERE car.shop_id = shop.id
          ) as cars
        FROM
          shop
      `,
    });

    this.assertGetShops(rows);

    return rows;
  }

  /**
   * Добавление магазина.
   * Add a shop.
   * @param shop - Данные магазина. Shop data.
   * @returns Идентификатор добавленного магазина. Id of the added shop.
   */
  public async add(shop: InsertableShop): Promise<number> {
    try {
      this.assertInsertableShop(shop);
    } catch (err) {
      throw new Error("Invalid add payload");
    }

    const { rows } = await this.db.query({
      name: "insert-shop",
      text: `
        INSERT INTO shop (name, phone_number)
        VALUES ($1, $2)
        RETURNING id
      `,
      values: [shop.name, shop.phone_number],
    });

    return rows[0].id as number;
  }

  /**
   * Удаление магазина.
   * Delete a shop.
   * @param id - Идентификатор магазина. Shop id.
   * @returns Количество удаленных строк. Number of deleted rows.
   */
  public async delete(id: number): Promise<number> {
    this.assertNumber(id);
    const { rowCount } = await this.db.query({
      name: "delete-shop",
      text: `
        DELETE FROM shop
        WHERE id = $1
      `,
      values: [id],
    });
    this.assertNumber(rowCount);
    return rowCount;
  }
}
