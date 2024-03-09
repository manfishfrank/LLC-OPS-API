const db = require("../models");
const Item = db.items;
const Participant = db.participants;
const Season = db.seasons;
const Submission = db.submissions;
const Op = db.Sequelize.Op;
const Constants = require("../constants/index");

exports.getLeaderBoard = (req, res) => {

    let sumbissions;

    Season.findOne({
        where: {id: req.params.id},
        include: [{
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
                    totalPoints: 0
                };
            }
            leaderboard[participant.id].totalPoints += submission.points;
        });
        const sortedLeaderBoard = Object.values(leaderboard).sort((a, b) => b.totalPoints - a.totalPoints);
        res.send(sortedLeaderBoard);
        // sumbissions = data.submissions;
        // Participant.findAll({
        //     where: {
        //         active: {
        //             [Op.eq]: 1
        //         }
        //     }
        // }).then((parties, data) => {
        //     console.log('parties');
        //     const testing = {
        //         sub: sumbissions,
        //         parties: parties,
        //         data: data,
        //     };

        //     res.send(testing);
        //     //now we have all submissions for a season
        //     // const leaderboardMap = new Map();
        //     // data.submissions.forEach((sub) => {
        //     //      const participantId = sub.participantId;
        //     //      const party = parties.find((p) => {p.id === sub.participantId});
        //     //      const points = sub.points;
        //     //          if(leaderboardMap.has(participantId)){
        //     //              leaderboardMap.set(participantId, party, leaderboardMap.get(participantId) + points);
        //     //          } else {
        //     //              leaderboardMap.set(participantId, party, points)
        //     //          }
        //     // });
        //     //  leaderboardMap.sort((a, b) => b.points - a.points);

        //     // res.send(leaderboardMap);

        // }).catch(err => {
        //     res.status(500).send({
        //       message:
        //         err.message || `${Constants.ERROR_GEN}`
        //     });
        //   });


    }).catch(err => {
        res.status(500).send({
          message:
            err.message || `${Constants.ERROR_GEN}`
        });
      });



};