import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";

const specs = YAML.load("./src/docs/openapi.yaml");

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
