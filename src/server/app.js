const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");

const app = express();

app.use(config.server.routeBase, express.static(config.dist));

const mock = filePath => (req, res) => {
  console.log(`request file ${filePath}`);
  const absPath = path.resolve(`../mocks/${filePath}.json`);
  res.sendFile(absPath);
};

const fakeLatencyMiddleware = (req, res, next) => {
  setTimeout(next, Math.random() * 300);
};

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3000"]
  }),
  fakeLatencyMiddleware
);

app
  .get("/games", mock("games"))
  .post("/games", mock("game.lobby"))
  .post("/games/:id/kick", mock("game.playing"))
  .post("/games/:id/play", mock("game.playing"))
  .post("/games/:id/start", mock("game.playing"))
  .post("/games/:id/delete", mock("games"))
  .post("/games/:id/leave", mock("game.playing"))
  .get("/games/1", mock("game.lobby"))
  .get("/games/2", mock("game.completed"))
  .get("/games/:id", mock("game.playing"))
  .post("/login", mock("login"));

app.listen(3008, () => {
  console.log("Listening port 3008");
});
