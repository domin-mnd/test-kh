export type GetCars = GetCar[];

export interface GetCar {
  id: number;
  brand: string;
  model: string;
  price: number;
  shop_name: string;
  phone_number: string;
}
