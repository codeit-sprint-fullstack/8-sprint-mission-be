import swaggerUi from "swagger-ui-express";
import swaggerJsDoc, { OAS3Options } from "swagger-jsdoc";

const options: OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PandaMarket API",
      version: "1.0.0",
      description: "Sprint 10 PandaMarket API 문서",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "개발 서버",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
