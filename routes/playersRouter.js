const express = require("express");
const playersRouter = express.Router();

playersRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the players to you.");
  })
  .post((req, res) => {
    res.end(
      `Will add the player: ${req.body.name} with description ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /players");
  })
  .delete((req, res) => {
    res.end("Deleting all players");
  });

playersRouter
  .route("/:playerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send details of the player: ${req.params.playerId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /players/${req.params.playerId}`);
  })
  .put((req, res) => {
    res.write(`Updating the player: ${req.params.playerId}\n`);
    res.end(
      `Will update the player: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting player: ${req.params.playerId}`);
  });

module.exports = playersRouter;
