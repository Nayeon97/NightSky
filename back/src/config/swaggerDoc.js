import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import "./env.js";
const __dirname = path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "밤하늘 API Docs",
      version: "1.0.0",
      description: "밤하늘 prototype",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
        },
      },
    },
    security: {
      cookieAuth: [],
    },
  },
  swagger: "2.0",
  basePath: `localhost:${process.env.PORT}/`,
  apis: [__dirname + "/src/routers/*.js", __dirname + "/src/swagger/*"],
};

export const specs = swaggerJSDoc(options);
