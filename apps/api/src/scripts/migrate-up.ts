import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { error, log } from "@repo/logger";
import { db } from "@/database";

// Мини версия мигратора, не хочу писать полноценную библиотеку
// Mini version of Migrator, I don't want to make an entire lib

const MIGRATION_PATH = resolve(__dirname, "../src/database/migrations");

function getQueries(): string[] {
  return readdirSync(MIGRATION_PATH, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => {
      return readFileSync(`${item.path}/${item.name}`, "utf-8");
    });
}

async function migrateUp(): Promise<void> {
  const promises = getQueries().map(
    (query): Promise<unknown> => db.query(query),
  );
  await Promise.all(promises);
  await db.end();
}

migrateUp().then(log).catch(error);
