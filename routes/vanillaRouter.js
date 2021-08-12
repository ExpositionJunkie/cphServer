// for vanilla hustle table listings

const express = require("express");
const vanillaRouter = express.Router();

vanillaRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the vanilla hustle table information to you.");
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`Users are unable to edit vanilla hustle tables.`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /vanilla");
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /vanilla");
  });

vanillaRouter
  .route("/:vanillaTableId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the vanilla Hustle Table: ${req.params.vanillaTableId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /vanilla/${req.params.vanillaTableId}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT updates are not allowed on /vanilla/${req.params.vanillaTableId}.`
    );
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(
      `DELETE operations are not allowed on /vanilla/${req.params.vanillaTableId}`
    );
  });

module.exports = vanillaRouter;
