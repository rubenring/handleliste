export default {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Rubens handleliste api",
      version: "0.1.0",
      description: "Handlelist api",
      servers: [`http://localhost:${process.env.PORT}&#39`],
      contact: {
        name: "rubenring",
        url: "https://github.com/rubenring/handleliste",
        email: "",
      },
      components: {
        schemas: {
          auth: {
            properties: {
              name: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/auth/auth.js", "./routes/healthCheck/healthCheck.js"],
};
