const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Staff = sequelize.define('Staff', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Staff;
