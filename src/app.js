require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
// const corsOptionsDelegate = require("./corsOptionsDelegate");
const { error404, errorHandler } = require("./error");
const { NODE_ENV } = require("./config");
// const notesRouter = require("./notes/notes-router");
const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());

// app.use("/notes", cors(corsOptionsDelegate), notesRouter);

// app.get("/", cors(corsOptionsDelegate), (req, res) => {
//   res.send("Hello, world!");
// });

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(error404, errorHandler);

module.exports = app;
