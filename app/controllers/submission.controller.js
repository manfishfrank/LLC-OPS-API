const db = require("../models");
const Item = db.items;
const Participant = db.participants;
const Season = db.seasons;
const Submission = db.submissions;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

// Create and Save a new Submission
exports.create = (req, res) => {
  // Validate request
  if (!req.body.submissionSignature) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} submissionSignature`
    });
    return;
  }

  if (!req.body.participantId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} participantId`
    });
    return;
  }

  if (!req.body.itemId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} itemId`
    });
    return;
  }
  
  if (!req.body.quantity) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} quantity`
    });
    return;
  }

  if (!req.body.seasonId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} seasonId`
    });
    return;
  }

  Item.findByPk(req.body.itemId)
    .then((item) => {
      if(!item) {
        return res.status(404).send({
          message: 'Item not found' //move to constants
        });
      }
      const points = item.value * req.body.quantity;

      const submission = {
        submissionSignature: req.body.submissionSignature,
        participantId: req.body.participantId,
        itemId: req.body.itemId,
        quantity: req.body.quantity,
        seasonId: req.body.seasonId,
        points: points
      }

      Submission.create(submission)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `${Constants.ERROR_GEN}`
        });
      }); 
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `${Constants.ERROR_GEN}`
    });
  });
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
  Item.findAll()
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

// Find a single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findByPk(id)
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

// Update a Item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Item.update(req.body, {
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

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.destroy({
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
  Item.destroy({
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
