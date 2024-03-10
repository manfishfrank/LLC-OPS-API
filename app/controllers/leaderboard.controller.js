const db = require("../models");
const Item = db.items;
const Participant = db.participants;
const Season = db.seasons;
const Submission = db.submissions;
const Rank = db.ranks;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

exports.getLeaderBoard = (req, res) => {

    Season.findOne({
        where: {id: req.params.id},
        include: [{
            model: Rank,
        },
        {
            model: Submission,
            include: [{
                model: Participant,
                where: {
                    active: 1,
                }
            }],
        }]
    }).then((data) => {
        if(!data) {
            return res.status(404).send({
                message: 'Leaderboard Submissions for season not found' //move to constants
            });
        }
        let leaderboard = {}
        data.Submissions.forEach((submission) => {
            const participant = submission.Participant;
            if(!leaderboard[participant.id]) {
                leaderboard[participant.id] = {
                    participantId: participant.id,
                    discordName: participant.discordName,
                    inGameName: participant.inGameName,
                    selectedRank: null,
                    totalPoints: 0
                };
            }
            leaderboard[participant.id].totalPoints += submission.points;
        });
        const sortedLeaderBoard = Object.values(leaderboard).sort((a, b) => b.totalPoints - a.totalPoints);
        sortedLeaderBoard.forEach((player) => {
            //assign Rank
            data.Ranks.forEach((rank) => {
                if(player.totalPoints > rank.pointThreshold) {
                    if(!player.selectedRank || rank.pointThreshold > player.selectedRank.pointThreshold){
                        player.selectedRank = rank
                    }
                }
            })
        })
        res.send(sortedLeaderBoard);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || `${Constants.ERROR_GEN}`
        });
      });
};