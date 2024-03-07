module.exports = (sequelize, Sequelize) => {
    const Rank = sequelize.define("Rank", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rankNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        pointThreshold: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        badgeUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        seasonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Seasons',
                key: 'id',
            },
        },
        prizes: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    });

    return Rank;
};