var Sequelize = require('sequelize');
var db = require('./_db');
var Restaurant = require('./restaurant');
var Hotel = require('./hotel');
var Activity = require('./activity');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  defaultScope: {
    include: [Restaurant, Hotel, Activity]
  }
})

module.exports = Day;
