import { computed } from "vue";
import {
  type AddCar,
  type DeleteCar,
  type GetCars,
  useFetch,
} from "../composables/useFetch";
import { defineStore } from "pinia";
import { useShopsStore } from "./shops";

export interface AddCarBody {
  brand: string;
  model: string;
  price: number;
  shop_id: number;
}

export const useCarsStore = defineStore("cars", () => {
  const shops = useShopsStore();
  const get = useFetch<GetCars>("/v1/car");
  const data = computed(() => get.data);
  const loading = computed(() => get.isLoading);

  const addCar = async (
    car: AddCarBody,
    shop_name: string,
    phone_number: string,
  ): Promise<void> => {
    const { loadingPromise } = useFetch<AddCar>("/v1/car", {
      method: "POST",
      body: car,
    });

    const res = await loadingPromise.value;

    if (res && res.ok) {
      const carPayload = {
        ...car,
        id: res.id ?? -1,
        shop_name,
        phone_number,
      };

      data.value.value?.push(carPayload);
      shops.addCarToShop(car.shop_id, carPayload);
    }
  };

  const deleteCar = async (id: number): Promise<void> => {
    const { loadingPromise } = useFetch<DeleteCar>("/v1/car", {
      method: "DELETE",
      body: {
        id,
      },
    });

    const res = await loadingPromise.value;

    if (res && res.ok) {
      data.value.value = data.value.value?.filter((car) => car.id !== id) ?? [];
      shops.deleteCarFromShop(id);
    }
  };

  const deleteCarsByShopName = (shop_name: string): void => {
    data.value.value =
      data.value.value?.filter((car) => car.shop_name !== shop_name) ?? [];
  };

  return { data, loading, addCar, deleteCar, deleteCarsByShopName };
});
