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

    // Retreive a Participant with details
    router.get("/details/:id", participant.getParticipantDetails);
  
    app.use('/api/participant', router);
  };
  