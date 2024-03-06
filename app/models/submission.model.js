module.exports = (sequelize, Sequelize) => {
    const Submission = sequelize.define("Submission", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        submissionSignature: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        participantId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Participants',
                key: 'id',
            }
        },
        itemId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Items',
                key: 'id',
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        seasonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Seasons',
                key: 'id',
            }
        },
        points: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Submission;
};
  
