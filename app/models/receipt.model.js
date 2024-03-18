module.exports = (sequelize, Sequelize) => {
    const Receipt = sequelize.define("Receipt", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        officerSignature: {
            type: Sequelize.STRING,
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
        prizeId: {
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
    });

    return Receipt;
};
  
