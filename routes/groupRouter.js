const express = require("express");
const authenticate = require("../authenticate");
const groupRouter = express.Router();
const Group = require("../models/group");

// Multiple Groups
groupRouter
  .route("/")
  .get((req, res, next) => {
    Group.find()
      .then((groups) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(groups);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Group.create(req.body)
      .then((group) => {
        console.log("Group Created", group);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(group);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /groups");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Group.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// Single Group By Id
groupRouter
  .route("/:groupId")
  .get((req, res, next) => {
    Group.findById(req.params.groupId)
      .then((group) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(group);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /groups/${req.params.groupId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Group.findByIdAndUpdate(
      req.params.groupId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((group) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(group);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Group.findByIdAndDelete(req.params.groupId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = groupRouter;
