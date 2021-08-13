const express = require("express");
const { rawListeners } = require("../models/player");
const Player = require("../models/player");
const playersRouter = express.Router();

// Multiple Players
playersRouter
  .route("/")
  .get((req, res, next) => {
    Player.find()
      .then((players) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(players);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Player.create(req.body)
      .then((player) => {
        console.log("Player Created", player);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(player);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /players");
  })
  .delete((req, res, next) => {
    Player.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// Single Player By Id
playersRouter
  .route("/:playerId")
  .get((req, res, next) => {
    Player.findById(req.params.playerId)
      .then((player) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(player);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /players/${req.params.playerId}`);
  })
  .put((req, res, next) => {
    Player.findByIdAndUpdate(
      req.params.playerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((player) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(player);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Player.findByIdAndDelete(req.params.playerId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = playersRouter;
