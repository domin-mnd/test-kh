import { error } from "@repo/logger";
import { defineRoute } from "@/router";
import { db } from "@/database";
import { ShopRepository } from "@/database/repositories/shop";

const shopRepository = new ShopRepository(db);

/**
 * @openapi
 * /v1/shop:
 *   post:
 *     summary: Добавление магазина.
 *     description: Добавление нового магазина.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название магазина.
 *               phone_number:
 *                 type: string
 *                 description: Номер телефона магазина.
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
 *                   description: Идентификатор добавленного магазина.
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
    const id = await shopRepository.add(req.body);
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

    error(err);
    return res.status(500).json({
      ok: false,
    });
  }
});
