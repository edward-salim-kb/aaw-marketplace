import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import express_prom_bundle from "express-prom-bundle";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import tenantRoutes from './tenant/tenant.routes';
import { swaggerOptions } from "./swagger.config";

const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true
});

const app = express();
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/tenant", tenantRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Tenant Microservice is running!");
});

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
  console.log(`🚀 Tenant Microservice has started on port ${PORT}`);
  console.log(`📚 Swagger available at: http://localhost:${PORT}/swagger`);
});
