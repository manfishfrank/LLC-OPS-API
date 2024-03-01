module.exports = app => {
    const participant = require("../controllers/participant.controller");
  
    var router = require("express").Router();
  
    // Create a new Participant
    router.post("/", participant.create);
  
    // Retrieve all Participant
    router.get("/", participant.findAll);
  
    // Retrieve a single Participant with id
    router.get("/:id", participant.findOne);
  
    // Update a Participant with id
    router.put("/:id", participant.update);
  
    // Delete a Participant with id
    router.delete("/:id", participant.delete);
  
    // Delete all Participant
    router.delete("/", participant.deleteAll);
  
    app.use('/api/participant', router);
  };
  