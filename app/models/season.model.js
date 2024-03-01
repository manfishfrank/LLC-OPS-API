module.exports = (sequelize, Sequelize) => {
    const Season = sequelize.define("Season", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        iteration: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    });

    return Season;
};