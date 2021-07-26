const { Sequelize, DataTypes, Op } = require('sequelize');
const db = require('./db');

// This file shows sample code for a Sequelize Model.
const DummyModel = db.define('dummyModel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'David Smith',
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  dummySex: {
    type: DataTypes.ENUM('COACH, PLAYER'),
    defaultValue: 'COACH',
  },
  isCoach: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.dummySex === 'COACH';
    }
  },
  isPlayer: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.dummySex === 'PLAYER';
    }
  }
});


// CLASS METHODS
DummyModel.findCoachDummies = function () {
  return this.findAll({
    where: {
      dummySex: 'COACH',
    }
  });
}

// INSTANCE METHODS
DummyModel.prototype.getTeammates = function () {
  return DummyModel.findAll({
    where: {
      coachId: this.coachId,
      id: {
        [Op.not]: this.id
      }
    }
  });
}

// HOOKS
DummyModel.beforeUpdate(() => {
  // Before Update logic.
});

// ASSOCIATIONS
DummyModel.belongsTo(DummyModel, { as: 'coach' });
DummyModel.hasMany(DummyModel, { as: 'players', foreignKey: 'coachId' });


module.exports = DummyModel;
