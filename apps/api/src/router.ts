import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Express, RequestHandler } from "express";
import { info } from "@repo/logger";
import { version } from "../package.json";

function assertFileName(
  fileName: string | undefined,
): asserts fileName is string {
  if (!fileName) {
    throw new Error("File name is not provided");
  }
}

function assertMethod(method: string): asserts method is Method {
  if (
    ![
      "all",
      "get",
      "post",
      "put",
      "delete",
      "patch",
      "options",
      "head",
    ].includes(method)
  ) {
    throw new Error("Invalid method");
  }
}

function assertImport(
  route: unknown,
): asserts route is { default: RequestHandler } {
  if (typeof route !== "object" || route === null) {
    throw new Error("Route import is not an object");
  }

  if (!("default" in route)) {
    throw new Error("Invalid route");
  }
}

function assertHandler(handler: unknown): asserts handler is RequestHandler {
  if (typeof handler !== "function") {
    throw new Error("Invalid handler");
  }
}

/**
 * Получение массива файлов в директории.
 * Get array of files in directory.
 * @param dir - Путь к директории. Path to directory.
 * @returns Массив файлов. Array of files.
 * @example
 * getFiles("routes") == ["some/route.get.js", "some/very/nested/endpoint.post.js"]
 */
function* getFiles(dir: string): Generator<string> {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const yieldValue = join(dir, file.name);

    if (file.isDirectory()) {
      yield* getFiles(yieldValue);
    } else {
      yield yieldValue;
    }
  }
}

export type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";
export interface Structure {
  endpoint: string;
  method: Method;
}

/**
 * Получение структуры из файлового пути.
 * Get structure from file path.
 * @param path - Путь к файлу. Path to file.
 * @example
 * dist/routes/some/route.get.ts == endpoint: "/v1/some/route", method: "get"
 * dist/routes/some/very/nested/endpoint.post.js == endpoint: "/v1/some/very/nested/endpoint", method: "post"
 */
function getStructure(rootDir: string, path: string): Structure {
  const fileName = path.split("/").pop();
  assertFileName(fileName);

  const [endpoint, method = "get"] = fileName.split(".");
  assertMethod(method);

  // Удаление rootDir, а также замена \ на /
  // Remove rootDir as well as replace \ with /
  const normalizedEndpoint = endpoint
    .replace(join(rootDir), "")
    .replace(/\\/g, "/");

  const endpointVersion = `v${version.split(".")[0]}`;

  return { endpoint: `/${endpointVersion}${normalizedEndpoint}`, method };
}

/**
 * Регистрация эндпоинтов относительно файловой системы.
 * Register endpoints relative to file system.
 * @param app - Экземпляр Express. Express instance.
 * @see {@link https://nitro.unjs.io/guide/routing | Роутинг в Nitro / Routing in Nitro}
 */
export function createRouter(app: Express): void {
  const ROOT_DIR = "./dist/routes";
  for (const file of getFiles(ROOT_DIR)) {
    const { endpoint, method } = getStructure(ROOT_DIR, file);
    // Импорт при директории dist
    // Import within dist directory
    const route = `../${file}`;
    // eslint-disable-next-line @typescript-eslint/no-var-requires -- Use it for CJS requires, import is transpiled wrong way
    const staticRequire = require(route);
    assertImport(staticRequire);
    assertHandler(staticRequire.default);

    app[method](endpoint, staticRequire.default);
    info(`Registered ${method.toUpperCase()} ${endpoint}`);
  }
}

/**
 * Определение роута.
 * Route definition.
 * @param handler - Обработчик запроса. Request handler.
 * @returns Обработчик запроса. Request handler.
 */
export function defineRoute<T extends RequestHandler | Promise<RequestHandler>>(
  handler: T,
): T {
  return handler;
}
