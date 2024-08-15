import { computed } from "vue";
import {
  type AddShop,
  type DeleteShop,
  type GetShops,
  useFetch,
  type GetCar,
} from "../composables/useFetch";
import { defineStore } from "pinia";
import { useCarsStore } from "./cars";

export interface AddShopBody {
  name: string;
  phone_number: string;
}

export const useShopsStore = defineStore("shops", () => {
  const get = useFetch<GetShops>("/v1/shop");
  const data = computed(() => get.data);
  const loading = computed(() => get.isLoading);

  const addCarToShop = (shop_id: number, car: GetCar): void => {
    const shop = data.value.value?.find((s) => s.id === shop_id);

    if (shop) {
      if (shop.cars === null) shop.cars = [];
      shop.cars.push(car);
    }
  };

  const deleteCarFromShop = (car_id: number): void => {
    data.value.value?.forEach((shop) => {
      if (shop.cars === null) shop.cars = [];
      shop.cars = shop.cars.filter((car) => car.id !== car_id);
    });
  };

  const addShop = async (shop: AddShopBody): Promise<void> => {
    const { loadingPromise } = useFetch<AddShop>("/v1/shop", {
      method: "POST",
      body: shop,
    });

    const res = await loadingPromise.value;

    if (res && res.ok)
      data.value.value?.push({
        ...shop,
        id: res.id ?? -1,
        cars: [],
      });
  };

  const deleteShop = async (id: number): Promise<void> => {
    const { deleteCarsByShopName } = useCarsStore();
    const { loadingPromise } = useFetch<DeleteShop>("/v1/shop", {
      method: "DELETE",
      body: {
        id,
      },
    });

    const res = await loadingPromise.value;

    if (res && res.ok) {
      const foundShop = data.value.value?.find((shop) => shop.id === id);
      if (foundShop?.name) deleteCarsByShopName(foundShop.name);
      data.value.value =
        data.value.value?.filter((shop) => shop.id !== id) ?? [];
    }
  };

  return {
    data,
    loading,
    addShop,
    deleteShop,
    addCarToShop,
    deleteCarFromShop,
  };
});
