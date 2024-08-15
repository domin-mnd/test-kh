import type { Pool } from "pg";
import * as v from "valibot";

export interface CarBrand {
  id: number;
}

export class CarBrandRepository {
  constructor(private db: Pool) {}

  private assertCarBrand(value: unknown): asserts value is CarBrand {
    const schema = v.object({
      id: v.number(),
    });

    try {
      v.parse(schema, value);
    } catch (err) {
      throw new Error("Invalid CarBrand schema");
    }
  }

  private async validateCarBrand(
    value: unknown,
    name: string,
  ): Promise<CarBrand> {
    try {
      this.assertCarBrand(value);
      return value;
    } catch (err) {
      const { rows } = await this.db.query({
        name: "insert-brand",
        text: `
          INSERT INTO
            car_brand (name)
          VALUES
            ($1)
          RETURNING
            id
        `,
        values: [name],
      });

      this.assertCarBrand(rows[0]);

      return rows[0];
    }
  }

  async getCarBrandId(name: string): Promise<number> {
    const { rows } = await this.db.query({
      name: "fetch-brand",
      text: `
        SELECT
          id
        FROM
          car_brand
        WHERE
          name = $1
      `,
      values: [name],
    });

    const { id } = await this.validateCarBrand(rows[0], name);
    return id;
  }
}
