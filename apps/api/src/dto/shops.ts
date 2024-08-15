import type { GetCars } from "./cars";

export type GetShops = GetShop[];

export interface GetShop {
  id: number;
  name: string;
  phone_number: string;
  cars: GetCars;
}
