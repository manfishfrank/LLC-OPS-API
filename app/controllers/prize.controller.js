const db = require("../models");
const Prize = db.prizes;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

// Create and Save a new Prize
exports.create = (req, res) => {
  // Validate request
  if (!req.body.rankId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} rankId`
    });
    return;
  }

  // Create a Prize. Active defaults to true.
  const prize = {
    lodestoneId: req.body.lodestoneId,
    description: req.body.description,
    discordRole: req.body.discordRole,
    rankId: req.body.rankId
  };

  // Save a Participant in the database
  Prize.create(prize)
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

// Retrieve all Participants from the database.
exports.findAll = (req, res) => {
  Prize.findAll()
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

// Find a single Participant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Prize.findByPk(id)
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

// Update a Participant by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Prize.update(req.body, {
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

// Delete a Participant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Prize.destroy({
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

// Delete all Participants from the database.
exports.deleteAll = (req, res) => {
  Prize.destroy({
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
