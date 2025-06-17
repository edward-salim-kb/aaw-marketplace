import path from "path";

export const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Orders Microservice API",
      version: "1.0.0",
      description: "API documentation for Order and Cart endpoints",
    },
    host: `localhost:${process.env.PORT || 8001}`,
    basePath: "/",
    schemes: ["http"],
    definitions: {
      Order: {
        type: "object",
        required: ["id", "tenant_id", "user_id", "order_date", "total_amount", "order_status", "shipping_provider"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          order_date: { type: "string", format: "date-time" },
          total_amount: { type: "integer" },
          order_status: {
            type: "string",
            enum: ["PENDING", "PAID", "CANCELLED", "REFUNDED"]
          },
          shipping_provider: {
            type: "string",
            enum: ["JNE", "TIKI", "SICEPAT", "GOSEND", "GRAB_EXPRESS"]
          },
          shipping_code: { type: "string" },
          shipping_status: {
            type: "string",
            enum: ["PENDING", "SHIPPED", "DELIVERED", "RETURNED"]
          }
        }
      },
      OrderDetail: {
        type: "object",
        required: ["id", "tenant_id", "order_id", "product_id", "quantity", "unit_price"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          order_id: { type: "string", format: "uuid" },
          product_id: { type: "string", format: "uuid" },
          quantity: { type: "integer" },
          unit_price: { type: "integer" }
        }
      },
      CartItem: {
        type: "object",
        required: ["id", "tenant_id", "user_id", "product_id", "quantity"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          product_id: { type: "string", format: "uuid" },
          quantity: { type: "integer" }
        }
      },
      Payment: {
        type: "object",
        required: ["id", "tenant_id", "order_id", "payment_date", "payment_method", "payment_reference", "amount"],
        properties: {
          id: { type: "string", format: "uuid" },
          tenant_id: { type: "string", format: "uuid" },
          order_id: { type: "string", format: "uuid" },
          payment_date: { type: "string", format: "date-time" },
          payment_method: { type: "string" },
          payment_reference: { type: "string" },
          amount: { type: "integer" }
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
    path.join(__dirname, "./order/order.routes.ts"),
    path.join(__dirname, "./cart/cart.routes.ts"),
    path.join(__dirname, "server.ts"),
  ],
};
