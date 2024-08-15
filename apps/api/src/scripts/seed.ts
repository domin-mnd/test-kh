import { error, log } from "@repo/logger";
import { db } from "@/database";
import { CarRepository } from "@/database/repositories/car";
import { ShopRepository } from "@/database/repositories/shop";

const carRepository = new CarRepository(db);
const shopRepository = new ShopRepository(db);

async function insertData(): Promise<void> {
  const firstId = await shopRepository.add({
    name: "Дилер",
    // Фейковые данные
    // Fake data
    phone_number: "89178342394",
  });

  const secondId = await shopRepository.add({
    name: "Автосалон",
    phone_number: "89177638219",
  });

  await carRepository.add({
    shop_id: firstId,
    brand: "Toyota",
    model: "Corolla",
    price: 862000,
  });

  await carRepository.add({
    shop_id: firstId,
    brand: "Toyota",
    model: "Camry",
    price: 3900000,
  });

  await carRepository.add({
    shop_id: secondId,
    brand: "Audi",
    model: "A4",
    price: 2310000,
  });

  await carRepository.add({
    shop_id: secondId,
    brand: "Ford",
    model: "Fiesta",
    price: 515000,
  });

  await carRepository.add({
    shop_id: secondId,
    brand: "Skoda",
    model: "Fabia",
    price: 317000,
  });

  await db.end();
}

insertData().then(log).catch(error);
