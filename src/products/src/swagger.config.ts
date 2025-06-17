import path from "path";

export const swaggerOptions = {
	swaggerDefinition: {
		swagger: "2.0",
		info: {
			title: "Products Microservice API",
			version: "1.0.0",
			description: "API documentation for the Products Microservice",
		},
		host: `localhost:${process.env.PORT || 8002}`,
		basePath: "/",
		schemes: ["http"],
		definitions: {
			Product: {
				type: "object",
				required: ["id", "tenant_id", "name", "price", "quantity_available"],
				properties: {
					id: { type: "string", format: "uuid" },
					tenant_id: { type: "string", format: "uuid" },
					name: { type: "string" },
					description: { type: "string" },
					price: { type: "integer" },
					quantity_available: { type: "integer" },
					category_id: { type: "string", format: "uuid" },
				},
			},
			Category: {
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
		path.join(__dirname, "./product/product.routes.ts"),
		path.join(__dirname, "server.ts"),
	],
};