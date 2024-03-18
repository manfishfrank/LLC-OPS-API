const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// For the future, wrap this function into a start cmd.
// db.sequelize.sync({force: true})
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//     console.log(err);
//   });

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    console.log(err);
  });

// Testing route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LLC-Ops-Api." });
});

require("./app/routes/participant.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/season.routes")(app);
require("./app/routes/submission.routes")(app);
require("./app/routes/rank.routes")(app);
require("./app/routes/leaderboard.routes")(app);
require("./app/routes/prize.routes")(app);
require("./app/routes/receipt.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
