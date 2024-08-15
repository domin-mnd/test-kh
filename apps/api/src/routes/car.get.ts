import { error } from "@repo/logger";
import { defineRoute } from "@/router";
import { db } from "@/database";
import { CarRepository } from "@/database/repositories/car";

const carRepository = new CarRepository(db);

/**
 * @openapi
 * /v1/car:
 *   get:
 *     summary: Получение списка автомобилей.
 *     description: Получение списка всех автомобилей.
 *     responses:
 *       200:
 *         description: Успешное получение.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Идентификатор автомобиля.
 *                   brand:
 *                     type: string
 *                     description: Марка автомобиля.
 *                   model:
 *                     type: string
 *                     description: Модель автомобиля.
 *                   price:
 *                     type: number
 *                     description: Цена автомобиля.
 *                   shop_name:
 *                     type: string
 *                     description: Название магазина.
 *                   phone_number:
 *                     type: string
 *                     description: Номер телефона магазина.
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Успешно ли получение.
 */
export default defineRoute(async (_req, res) => {
  try {
    const cars = await carRepository.get();
    res.status(200).json(cars);
  } catch (err) {
    error(err);
    res.status(500).json({
      ok: false,
    });
  }
});
