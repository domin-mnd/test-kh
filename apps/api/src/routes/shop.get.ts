import { error } from "@repo/logger";
import { defineRoute } from "@/router";
import { db } from "@/database";
import { ShopRepository } from "@/database/repositories/shop";

const shopRepository = new ShopRepository(db);

/**
 * @openapi
 * /v1/shop:
 *   get:
 *     summary: Получение списка магазинов.
 *     description: Получение списка всех магазинов.
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
 *                     description: Идентификатор магазина.
 *                   name:
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
    const shops = await shopRepository.get();
    res.status(200).json(shops);
  } catch (err) {
    error(err);
    res.status(500).json({
      ok: false,
    });
  }
});
