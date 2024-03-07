const dbConfig = require("../config/db.config.js");



const Sequelize = require("sequelize");
//const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {  
  host: DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  dialectOptions: {
    socketPath: `/cloudsql/llc-ops-api:us-central1:llc-ops-sql`,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.participants = require("./participant.model.js")(sequelize, Sequelize);
db.seasons = require("./season.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);
db.submissions = require("./submission.model.js")(sequelize, Sequelize);
db.ranks = require("./rank.model.js")(sequelize, Sequelize);

db.seasons.hasMany(db.ranks, {
  foreignKey: 'seasonId',
  onDelete: 'CASCADE'
});

db.ranks.belongsTo(db.seasons, {
  foreignKey: 'seasonId',
});

db.seasons.hasMany(db.items, {
  foreignKey: 'seasonId',
  onDelete: 'CASCADE'
});

db.items.belongsTo(db.seasons, {
  foreignKey: 'seasonId',
});

db.participants.hasMany(db.submissions, {
  foreignKey: 'participantId',
  onDelete: 'CASCADE'
});

db.seasons.hasMany(db.submissions, {
  foreignKey: 'seasonId',
  onDelete: 'CASCADE',
});

db.seasons.hasMany(db.submissions, {
  foreignKey: 'itemId',
  onDelete: 'CASCADE',
});

db.submissions.belongsTo(db.participants,{
  foreignKey: 'participantId',
});

db.submissions.belongsTo(db.seasons,{
  foreignKey: 'seasonId',
});

db.submissions.belongsTo(db.items,{
  foreignKey: 'itemId',
});

module.exports = db;
