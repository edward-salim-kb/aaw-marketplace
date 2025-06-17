import path from "path";

export const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Tenant Microservice API",
      version: "1.0.0",
      description: "API documentation for the Tenant Microservice",
    },
    host: `localhost:${process.env.PORT || 8003}`,
    basePath: "/",
    schemes: ["http"],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: "Enter your bearer token in the format **Bearer &lt;token&gt;**",
      },
    },
    definitions: {
      Tenant: {
        type: "object",
        required: ["id", "owner_id"],
        properties: {
          id: { type: "string", format: "uuid" },
          owner_id: { type: "string", format: "uuid" },
        },
      },
      TenantDetail: {
        type: "object",
        required: ["id", "tenant_id", "name"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          name: { type: "string" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          status: { type: "integer" },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "./tenant/tenant.routes.ts"),
    path.join(__dirname, "server.ts"),
  ],
};