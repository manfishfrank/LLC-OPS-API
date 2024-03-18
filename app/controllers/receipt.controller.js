const db = require("../models");
const Receipt = db.receipts;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

// Create and Save a new Receipt
exports.create = (req, res) => {
  // Validate request
  if (!req.body.officerSignature) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} officerSignature`
    });
    return;
  }

  if (!req.body.participantId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} participantId`
    });
    return;
  }

  if (!req.body.prizeId) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} prizeId`
    });
    return;
  }

  if (!req.body.quantity) {
    res.status(400).send({
      message: `${Constants.REQUIRE_PREFIX} quantity`
    });
    return;
  }

  // Create a Receipt. Active defaults to true.
  const receipt = {
    officerSignature: req.body.officerSignature,
    participantId: req.body.participantId,
    prizeId: req.body.prizeId,
    quantity: req.body.quantity
  };

  // Save a Receipt in the database
  Receipt.create(receipt)
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

// Retrieve all Receipt from the database.
exports.findAll = (req, res) => {
    Receipt.findAll()
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

// Find a single Receipt with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Receipt.findByPk(id)
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

// Update a Receipt by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Receipt.update(req.body, {
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

// Delete a Receipt with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Receipt.destroy({
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

// Delete all Receipt from the database.
exports.deleteAll = (req, res) => {
    Receipt.destroy({
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
