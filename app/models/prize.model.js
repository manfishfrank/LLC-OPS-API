module.exports = (sequelize, Sequelize) => {
    const Prize = sequelize.define("Prize", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lodestoneId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        discordRole: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        rankId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Ranks',
                key: 'id',
            }
        }
    });

    return Prize;
};
