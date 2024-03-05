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
                model: 'Participant',
                key: 'id',
            }
        },
        itemId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Item',
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
                model: 'Season',
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
  
