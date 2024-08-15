import { error } from "@repo/logger";
import { defineRoute } from "@/router";
import { db } from "@/database";
import { CarRepository } from "@/database/repositories/car";

const carRepository = new CarRepository(db);

/**
 * @openapi
 * /v1/car:
 *   delete:
 *     summary: Удаление автомобиля.
 *     description: Удаление автомобиля по идентификатору.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Идентификатор автомобиля.
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
 *                   description: Удален ли автомобиль.
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Валидация происходит в репозитории. Validation is done in the repository.
    const rowsDeleted = await carRepository.delete(req.body.id);

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
