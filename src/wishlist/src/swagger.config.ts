import path from "path";

export const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Wishlist Microservice API",
      version: "1.0.0",
      description: "API documentation for the Wishlist Microservice",
    },
    host: `localhost:${process.env.PORT || 8004}`,
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
      Wishlist: {
        type: "object",
        required: ["id", "tenant_id", "user_id", "name"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          name: { type: "string" },
        },
      },
      WishlistDetail: {
        type: "object",
        required: ["id", "wishlist_id", "product_id"],
        properties: {
          id: { type: "string", format: "uuid" },
          wishlist_id: { type: "string", format: "uuid" },
          product_id: { type: "string", format: "uuid" },
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
    path.join(__dirname, "./wishlist/wishlist.routes.ts"),
    path.join(__dirname, "server.ts"),
  ],
};