import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { version } from "../package.json";
import { createRouter } from "./router";

/**
 * Создаёт экземпляр сервера.
 * Creates a server instance.
 * @returns Экземпляр сервера. Server instance.
 */
export const createServer = (): Express => {
  const openApiSpec = swaggerJsdoc({
    definition: {
      openapi: "3.1.0",
      info: {
        title: "API тестового задания",
        version,
      },
    },
    apis: ["./src/routes/*.ts"],
  });

  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/v1/api-docs", serve, setup(openApiSpec));

  createRouter(app);
  return app;
};
