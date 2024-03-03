const db = require("../models");
const Participant = db.participants;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

// Create and Save a new Participant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.discordName) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} discordName`
    });
    return;
  }

  if (!req.body.inGameName) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} inGameNAme`
    });
    return;
  }

  // Create a Participant. Active defaults to true.
  const participant = {
    discordName: req.body.discordName,
    inGameName: req.body.inGameName,
  };

  // Save a Participant in the database
  Participant.create(participant)
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
  Participant.findAll()
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

  Participant.findByPk(id)
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

  Participant.update(req.body, {
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

  Participant.destroy({
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
  Participant.destroy({
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
