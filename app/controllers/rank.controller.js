const db = require("../models");
const Rank = db.ranks;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

// Create and Save a new Rank
exports.create = (req, res) => {
  // Validate request
  if (!req.body.rankNumber) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} rankNumber`
    });
    return;
  }

  if (!req.body.pointThreshold) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} pointThreshold`
    });
    return;
  }

  if (!req.body.seasonId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} season`
    });
    return;
  }


  // Rank Object
  const rank = {
    rankNumber: req.body.rankNumber,
    pointThreshold: req.body.pointThreshold,
    seasonId: req.body.seasonId,
    badgeUrl: req.body.badgeUrl,
  };

  // Save a Rank in the database
  Rank.create(rank)
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

// Retrieve all Ranks from the database.
exports.findAll = (req, res) => {
  Rank.findAll()
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

// Find a single Rank with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rank.findByPk(id)
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

// Update a Rank by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Rank.update(req.body, {
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

// Delete a Rank with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Rank.destroy({
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

// Delete all Ranks from the database.
exports.deleteAll = (req, res) => {
  Rank.destroy({
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
