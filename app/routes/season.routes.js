module.exports = app => {
    const season = require("../controllers/season.controller");
  
    var router = require("express").Router();
  
    // Create a new Season
    router.post("/", season.create);
  
    // Retrieve all Season
    router.get("/", season.findAll);
  
  
    // Retrieve a single Season with id
    router.get("/:id", season.findOne);
  
    // Update a Season with id
    router.put("/:id", season.update);
  
    // Delete a Season with id
    router.delete("/:id", season.delete);
  
    // Delete all Season
    router.delete("/", season.deleteAll);
  
    app.use('/api/season', router);
  };
  