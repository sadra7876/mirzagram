import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";
import path from "path";

let setupSwagger: (app: Express) => void;
try {
  const specs = YAML.load(path.join(__dirname, "docs", "openapi.yaml"));
  setupSwagger = (app: Express) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  };
} catch (e) {
  console.log(e);
  setupSwagger = (app: Express) => {
    app.use("/docs", (req, res) => {
      res.send("Swagger UI is not available");
    });
  };
}

export default setupSwagger;
