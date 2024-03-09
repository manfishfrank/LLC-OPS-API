module.exports = app => {
    const leaderboard = require("../controllers/leaderboard.controller");

    var router = require("express").Router();

    router.get("/:id", leaderboard.getLeaderBoard);

    app.use('/api/leaderboard', router);
};