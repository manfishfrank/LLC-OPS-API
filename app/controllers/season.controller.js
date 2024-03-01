const db = require("../models");
const Season = db.seasons;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

// Create and Save a new Season
exports.create = (req, res) => {
  // Validate request
  if (!req.body.iteration) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} iteration`
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} description`
    });
    return;
  }

  // Create a Season. Active defaults to true.
  const season = {
    iteration: req.body.iteration,
    description: req.body.description,
  };

  // Save a Season in the database
  Season.create(season)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `${Constants.ERROR_GEN}`
      });
    });
};

// Retrieve all Season from the database.
exports.findAll = (req, res) => {
    Season.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `${Constants.ERROR_GEN}`
      });
    });
};

// Find a single Season with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Season.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `${Constants.ERROR_NOT_FOUND}${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `${Constants.ERROR_CANT_FIND}${id}.`
      });
    });
};

// Update a Season by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Season.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `${Constants.SUCCESS_GEN}`
        });
      } else {
        res.send({
          message: `${Constants.ERROR_UPDATE}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `${Constants.ERROR_UPDATE}${err}`
      });
    });
};

// Delete a Season with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Season.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `${Constants.SUCCESS_GEN}`
        });
      } else {
        res.send({
          message: `${Constants.ERROR_DELETE}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `${Constants.ERROR_DELETE}${err}`
      });
    });
};

// Delete all Season from the database.
exports.deleteAll = (req, res) => {
    Season.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ${Constants.SUCCESS_GEN}`});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `${Constants.ERROR_DELETE}${err}`
      });
    });
};

// Additional use cases here when we think of them
