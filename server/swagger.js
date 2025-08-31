// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for the Task Manager application",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // change in prod
      },
    ],
  },
  apis: ["./routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
