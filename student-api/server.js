const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var cors = require("cors");
const fs = require("fs");

const app = express();

app.options("*", cors());
app.use(express.static(path.join(__dirname, "./uploaded")));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //'http://localhost:4200');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-access-token");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(expressSanitizer());

const swaggerUi = require("swagger-ui-express"),swaggerDocument = require("./swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/", require("./api.js"));


const server = app.listen(9999, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Running ... http://localhost%s", host, port);
  //   log.info("Running ... http://localhost%s", host, port);
});
