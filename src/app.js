require("dotenv").config({ path: "src/.env" });
const express = require("express");
const app = express();
require("./db/Connect");
app.use(express.static("public"));
app.set("view engine", "ejs");
var session = require("express-session");
var flash = require("connect-flash");

const port = process.env.PORT || 3000;
const router = require("./router/Router");
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(router);

app.listen(port);
