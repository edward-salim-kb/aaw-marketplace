import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import expressPromBundle from "express-prom-bundle";

import tenantRoutes from "@src/tenant/tenant.routes";

const app: Express = express();

// Prometheus metrics middleware
const metricsMiddleware = expressPromBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { project_name: "marketplace-tenant-service" },
  promClient: {
    collectDefaultMetrics: {},
  },
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tenants", tenantRoutes);

// Health check endpoint
app.get("/health", (_, res: Response) => {
  res.status(200).json({ status: "healthy" });
});

// Root endpoint
app.get("/", (_, res: Response) => {
  res.status(200).json({
    message: "Marketplace - Tenant Microservice",
    version: "1.0.0",
  });
});

// 404 Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
    path: req.path,
  });
});

const PORT = process.env.TENANT_SERVICE_PORT || 5004;

app.listen(PORT, () => {
  console.log(`Tenant Microservice running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
