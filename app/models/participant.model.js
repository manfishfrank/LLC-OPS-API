module.exports = (sequelize, Sequelize) => {
    const Participant = sequelize.define("Participant", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lodestoneId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        discordName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        inGameName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    });

    return Participant;
};
