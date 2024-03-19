module.exports = app => {
    const receipt = require("../controllers/receipt.controller");
  
    var router = require("express").Router();
  
    // Create a new receipt
    router.post("/", receipt.create);
  
    // Retrieve all receipt
    router.get("/", receipt.findAll);
  
    // Retrieve a single receipt with id
    router.get("/:id", receipt.findOne);
  
    // Update a receipt with id
    router.put("/:id", receipt.update);
  
    // Delete a receipt with id
    router.delete("/:id", receipt.delete);
  
    // Delete all receipt
    router.delete("/", receipt.deleteAll);

    // Get receipt By User Id
    router.get("/participant/:id", receipt.findAllByParticipant);
  
    app.use('/api/receipt', router);
  };