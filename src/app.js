require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { error404, errorHandler } = require("./error");
const { NODE_ENV } = require("./config");
const notesRouter = require("./endpoints/notes/notes-router");
const authRouter = require("./endpoints/auth/auth-router");
const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());

app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

app.use(error404, errorHandler);

module.exports = app;
