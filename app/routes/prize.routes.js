module.exports = app => {
    const prize = require("../controllers/prize.controller");
  
    var router = require("express").Router();
  
    // Create a new Prize
    router.post("/", prize.create);
  
    // Retrieve all Prize
    router.get("/", prize.findAll);
  
    // Retrieve a single Prize with id
    router.get("/:id", prize.findOne);
  
    // Update a Prize with id
    router.put("/:id", prize.update);
  
    // Delete a Prize with id
    router.delete("/:id", prize.delete);
  
    // Delete all Prize
    router.delete("/", prize.deleteAll);
  
    app.use('/api/prize', router);
  };
  