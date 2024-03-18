const dbConfig = require("../config/db.config.js");

const DB_USER='user_goes_here';
const DB_PASSWORD='password_goes_here';
const DB_NAME='db_name_goes_here';
const DB_HOST='host_ip_goes_here';

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
db.prizes = require("./prize.model.js")(sequelize, Sequelize);
db.receipts = require("./receipt.model.js")(sequelize, Sequelize);

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

db.seasons.hasMany(db.items, {
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

db.ranks.hasMany(db.prizes, {
  foreignKey: 'rankId',
  onDelete: 'CASCADE',
})

db.prizes.belongsTo(db.ranks,{
  foreignKey: 'rankId',
});

db.participants.hasMany(db.receipts, {
  foreignKey: 'participantId',
  onDelete: 'CASCADE',
});

db.prizes.hasMany(db.receipts, {
  foreignKey: 'prizeId',
  onDelete: 'CASCADE',
});

db.receipts.belongsTo(db.participants, {
  foreignKey: 'participantId',
})

db.receipts.belongsTo(db.prizes, {
  foreignKey: 'prizeId',
});

module.exports = db;
