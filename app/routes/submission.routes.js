module.exports = app => {
    const submission = require("../controllers/submission.controller");
  
    var router = require("express").Router();
  
    // Create a new Submission
    router.post("/", submission.create);
  
    // Retrieve all Submission
    router.get("/", submission.findAll);
  
    // Retrieve a single Submission with id
    router.get("/:id", submission.findOne);
  
    // Update a Submission with id
    router.put("/:id", submission.update);
  
    // Delete a Submission with id
    router.delete("/:id", submission.delete);
  
    // Delete all Submission
    router.delete("/", submission.deleteAll);
  
    app.use('/api/submission', router);
  };