import path from "path";

export const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Authentication Microservice API",
      version: "1.0.0",
      description: "API documentation for the Authentication Microservice",
    },
    host: `localhost:${process.env.PORT || 8000}`,
    basePath: "/",
    schemes: ["http"],
    definitions: {
      User: {
        type: "object",
        required: ["id", "tenant_id", "username", "email", "password", "created_at", "updated_at"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          username: { type: "string", maxLength: 256 },
          email: { type: "string", maxLength: 256 },
          password: { type: "string", maxLength: 256 },
          full_name: { type: "string", maxLength: 256 },
          address: { type: "string" },
          phone_number: { type: "string", maxLength: 256 },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              message: { type: "string" }
            }
          },
          status: { type: "integer" }
        }
      }
    }
  },
  apis: [
    path.join(__dirname, "./user/user.routes.ts"),
    path.join(__dirname, "server.ts"),
  ],
};
