<script setup lang="ts">
import { Table, Skeleton } from "@repo/ui";
import CarsDelete from "./CarsDelete.vue";
import { useCarsStore } from "../store/cars";

const { data, loading } = useCarsStore();
</script>
<template>
  <Table>
    <thead>
      <tr>
        <th scope="col">Марка</th>
        <th scope="col">Модель</th>
        <th scope="col">Стоимость</th>
        <th scope="col">Магазин</th>
        <th scope="col">Номер телефона</th>
      </tr>
    </thead>
    <tbody v-if="loading">
      <tr>
        <td><Skeleton :width="90" :height="20" /></td>
        <td><Skeleton :width="100" :height="20" /></td>
        <td><Skeleton :width="110" :height="20" /></td>
        <td><Skeleton :width="110" :height="20" /></td>
        <td><Skeleton :width="120" :height="20" /></td>
      </tr>
      <tr>
        <td><Skeleton :width="60" :height="20" /></td>
        <td><Skeleton :width="70" :height="20" /></td>
        <td><Skeleton :width="100" :height="20" /></td>
        <td><Skeleton :width="100" :height="20" /></td>
        <td><Skeleton :width="120" :height="20" /></td>
      </tr>
      <tr>
        <td><Skeleton :width="120" :height="20" /></td>
        <td><Skeleton :width="90" :height="20" /></td>
        <td><Skeleton :width="105" :height="20" /></td>
        <td><Skeleton :width="70" :height="20" /></td>
        <td><Skeleton :width="115" :height="20" /></td>
      </tr>
    </tbody>
    <tbody v-else-if="!data || !data.length">
      <tr>
        <td colspan="5">Здесь пока ничего нет :)</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="car in data" :key="car.id">
        <td>{{ car.brand }}</td>
        <td>{{ car.model }}</td>
        <td>{{ car.price }}</td>
        <td>{{ car.shop_name }}</td>
        <td>
          {{ car.phone_number }}
          <CarsDelete :carId="car.id" />
        </td>
      </tr>
    </tbody>
  </Table>
</template>
