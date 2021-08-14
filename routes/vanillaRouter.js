// for vanilla hustle table listings
const Vanilla = require("../models/vanilla");

const express = require("express");
const authenticate = require("../authenticate");
const vanillaRouter = express.Router();

// **** Vanilla Hustle Tables **** //
// By the literal Cyberpunk Red book //

// Vanilla Group
vanillaRouter
  .route("/")
  .get((req, res, next) => {
    Vanilla.find()
      .then((vanillas) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(vanillas);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Vanilla.create(req.body)
      .then((vanilla) => {
        console.log("Vanilla Created", vanilla);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(vanilla);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 403;
    res.end("PUT operation not supported on /vanilla");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Vanilla.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// **** Vanilla Hustle Tables By Class **** //
vanillaRouter
  .route("/:vanillaId")
  .get((req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(vanilla);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 403;
    res.end(`POST operation not supported on /vanilla/${req.params.vanillaId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Vanilla.findByIdAndUpdate(
      req.params.vanillaId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((vanilla) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(vanilla);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Vanilla.findByIdAndDelete(req.params.vanillaId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// **** Update tables **** //

// Table group
vanillaRouter
  .route("/:vanillaId/tables")
  .get((req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        if (vanilla) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(vanilla.tables);
        } else {
          err = new Error(
            `Vanilla Hustle Table ${req.params.vanillaId} not found`
          );
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        if (vanilla) {
          vanilla.tables.push(req.body);
          vanilla
            .save()
            .then((vanilla) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(vanilla);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(
            `Vanilla hustle table ${req.params.vanillaId} not found`
          );
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 403;
    res.end("PUT operation not supported on /table");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        if (vanilla) {
          for (let i = vanilla.tables.length - 1; i >= 0; i--) {
            vanilla.tables.id(vanilla.tables[i]._id).remove();
          }
          vanilla
            .save()
            .then((vanilla) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(vanilla);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(
            `Vanilla hustle table ${req.params.vanillaId} not found`
          );
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

// Table individual
vanillaRouter
  .route("/:vanillaId/tables/:tableId")
  .get((req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        if (vanilla && vanilla.tables.id(req.params.tableId)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(vanilla.tables.id(req.params.tableId));
        } else if (!vanilla) {
          err = new Error(
            `Vanilla hustle table ${req.params.vanillaId} not found`
          );
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Table ${req.params.tableId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /vanilla/${req.params.vanillaId}/${req.params.tableId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        if (vanilla && vanilla.tables.id(req.params.tableId)) {
          if (req.body.description) {
            vanilla.tables.id(req.params.tableId).description =
              req.body.description;
          }
          if (req.body.level1) {
            vanilla.tables.id(req.params.tableId).text = req.body.level1;
          }
          if (req.body.level2) {
            vanilla.tables.id(req.params.tableId).text = req.body.level2;
          }
          if (req.body.level3) {
            vanilla.tables.id(req.params.tableId).text = req.body.level3;
          }
          vanilla
            .save()
            .then((vanilla) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(vanilla);
            })
            .catch((err) => next(err));
        } else if (!vanilla) {
          err = new Error(
            `Vanilla hustle table ${req.params.vanillaId} not found`
          );
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Table ${req.params.tableId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Vanilla.findById(req.params.vanillaId)
      .then((vanilla) => {
        if (vanilla && vanilla.tables.id(req.params.tableId)) {
          vanilla.tables.id(req.params.tableId).remove();
          vanilla
            .save()
            .then((vanilla) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(vanilla);
            })
            .catch((err) => next(err));
        } else if (!vanilla) {
          err = new Error(
            `Vanilla hustle table ${req.params.vanillaId} not found`
          );
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Table ${req.params.tableId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = vanillaRouter;
