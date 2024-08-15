import { error } from "@repo/logger";
import { defineRoute } from "@/router";
import { db } from "@/database";
import { CarRepository } from "@/database/repositories/car";

const carRepository = new CarRepository(db);

/**
 * @openapi
 * /v1/car:
 *   post:
 *     summary: Добавление автомобиля.
 *     description: Добавление нового автомобиля.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 description: Марка автомобиля.
 *               model:
 *                 type: string
 *                 description: Модель автомобиля.
 *               price:
 *                 type: number
 *                 description: Цена автомобиля.
 *               shop_id:
 *                 type: number
 *                 description: Идентификатор магазина.
 *     responses:
 *       200:
 *         description: Успешное добавление.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Успешно ли добавление.
 *                 id:
 *                   type: number
 *                   description: Идентификатор добавленного автомобиля.
 *       400:
 *         description: Ошибка валидации.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Успешно ли добавление.
 *                 message:
 *                   type: string
 *                   description: Текст ошибки.
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Успешно ли добавление.
 */
export default defineRoute(async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Валидация происходит в репозитории. Validation is done in the repository
    const id = await carRepository.add(req.body);
    res.status(200).json({
      ok: true,
      id,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "Invalid add payload") {
      return res.status(400).json({
        ok: false,
        message: "Invalid body payload",
      });
    }

    if (err instanceof Error && err.message === "Invalid add insertion") {
      return res.status(400).json({
        ok: false,
        message: "Invalid shop_id provided",
      });
    }

    error(err);

    return res.status(500).json({
      ok: false,
    });
  }
});
