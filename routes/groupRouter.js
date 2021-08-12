const express = require("express");
const groupRouter = express.Router();

groupRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the groups to you.");
  })
  .post((req, res) => {
    res.end(
      `Will add the group: ${req.body.name} with description ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /groups");
  })
  .delete((req, res) => {
    res.end("Deleting all groups");
  });

groupRouter
  .route("/:groupId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Will send details of the group: ${req.params.groupId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /groups/${req.params.groupId}`);
  })
  .put((req, res) => {
    res.write(`Updating the group: ${req.params.groupId}\n`);
    res.end(
      `Will update the group: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting group: ${req.params.groupId}`);
  });

groupRouter
  .route("/:groupId/playerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the player: ${req.params.groupId.playerId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /groups/${req.params.groupId.playerId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the player: ${req.params.groupId.playerId}\n`);
    res.end(
      `Will update the player: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting player: ${req.params.groupId.playerId}`);
  });

module.exports = groupRouter;
