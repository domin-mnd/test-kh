import { error } from "@repo/logger";
import { defineRoute } from "@/router";
import { db } from "@/database";
import { ShopRepository } from "@/database/repositories/shop";

const shopRepository = new ShopRepository(db);

/**
 * @openapi
 * /v1/shop:
 *   delete:
 *     summary: Удаление магазина.
 *     description: Удаление магазина по идентификатору.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Идентификатор магазина.
 *     responses:
 *       200:
 *         description: Успешное удаление.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Успешно ли удаление.
 *                 deleted:
 *                   type: boolean
 *                   description: Удален ли магазин.
 *       500:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Успешно ли удаление.
 */
export default defineRoute(async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Валидация происходит в репозитории. Validation is done in the repository
    const rowsDeleted = await shopRepository.delete(req.body.id);

    res.status(200).json({
      ok: true,
      deleted: Boolean(rowsDeleted),
    });
  } catch (err) {
    error(err);
    res.status(500).json({
      ok: false,
    });
  }
});
