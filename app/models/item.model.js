module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("Item", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lodestoneId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        itemName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        value: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        seasonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Season',
                key: 'id',
            },
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    });

    return Item;
};
  