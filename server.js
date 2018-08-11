const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const helmet = require("helmet");
const sslRedirect = require("heroku-ssl-redirect");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(sslRedirect());
  server.use(bodyParser.json());
  server.use(helmet());

  server.get("*", (req, res) => {
    handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + port);
  });
});
