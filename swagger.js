const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "sasohae",
    description: "Description",
  },
  host: "tniop.shop",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./app.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);