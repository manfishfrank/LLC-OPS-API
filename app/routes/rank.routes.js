module.exports = app => {
    const rank = require("../controllers/rank.controller");
  
    var router = require("express").Router();
  
    // Create a new Rank
    router.post("/", rank.create);
  
    // Retrieve all Ranks
    router.get("/", rank.findAll);
  
    // Retrieve a single Rank with id
    router.get("/:id", rank.findOne);
  
    // Update a Rank with id
    router.put("/:id", rank.update);
  
    // Delete a Rank with id
    router.delete("/:id", rank.delete);
  
    // Delete all Rank
    router.delete("/", rank.deleteAll);
  
    app.use('/api/rank', router);
  };