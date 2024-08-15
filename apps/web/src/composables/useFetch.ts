import { type Ref, type UnwrapRef, ref } from "vue";

export interface ErrorResponse {
  ok: false;
  [key: string]: unknown;
}

export interface UseFetchOptions {
  method?: string;
  body?: unknown;
}

export type GetShops = GetShop[];

export interface GetShop {
  id: number;
  name: string;
  phone_number: string;
  cars: GetCars | null;
}

export interface AddShop {
  ok: boolean;
  id?: number;
}

export interface DeleteShop {
  ok: boolean;
  deleted?: boolean;
}

export type GetCars = GetCar[];

export interface GetCar {
  id: number;
  brand: string;
  model: string;
  price: number;
  shop_name: string;
  phone_number: string;
}

export interface AddCar {
  ok: boolean;
  id?: number;
}

export interface DeleteCar {
  ok: boolean;
  deleted?: boolean;
}

/**
 * Кастомный хук для отправки запросов на сервер.
 * Custom hook for sending requests to the server.
 * @param url - URL запроса. Request URL.
 * @param options - Опции запроса. Request options.
 * @returns - Объект с данными, ошибкой, промисом и состоянием загрузки. Object with data, error, promise and loading state.
 */
export function useFetch<T>(
  url: string,
  options?: UseFetchOptions,
): {
  data: Ref<UnwrapRef<T> | null>;
  error: Ref<ErrorResponse | null>;
  loadingPromise: Ref<Promise<UnwrapRef<T> | ErrorResponse> | undefined>;
  isLoading: Ref<boolean>;
} {
  const data = ref<T | null>(null);
  const error = ref<ErrorResponse | null>(null);
  const loadingPromise = ref<Promise<UnwrapRef<T> | ErrorResponse>>();
  const isLoading = ref<boolean>(false);

  const doFetch = (): void => {
    isLoading.value = true;
    loadingPromise.value = fetch(
      `http://localhost:${import.meta.env.VITE_API_PORT}${url}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: options?.method ?? "GET",
        body: JSON.stringify(options?.body),
      },
    )
      .then((res) => res.json())
      .then((json) => (data.value = json as UnwrapRef<T>))

      .catch((err) => (error.value = err as ErrorResponse))
      .finally(() => (isLoading.value = false));
  };
  doFetch();

  return { data, error, loadingPromise, isLoading };
}
