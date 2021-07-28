const { DataTypes, Op } = require('sequelize');
const db = require('../db');

// This file shows sample code for a Sequelize Model.
const Dummy = db.define('dummy', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'David Smith',
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  dummyType: {
    type: DataTypes.ENUM('PARENT', 'CHILD'),
    defaultValue: 'PARENT',
  },
  isParent: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.dummyType === 'PARENT';
    }
  },
  isChild: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.dummyType === 'CHILD';
    }
  }
});


// CLASS METHODS
Dummy.findCoachDummies = function () {
  return this.findAll({
    where: {
      dummyType: 'PARENT',
    }
  });
}

// INSTANCE METHODS
Dummy.prototype.getSiblings = function () {
  return Dummy.findAll({
    where: {
      parentId: this.parentId,
      id: {
        [Op.not]: this.id
      }
    }
  });
}

// HOOKS
Dummy.beforeUpdate(() => {
  // Before Update logic.
});

// ASSOCIATIONS
Dummy.belongsTo(Dummy, { as: 'parent' });
Dummy.hasMany(Dummy, { as: 'children', foreignKey: 'parentId' });


module.exports = Dummy;
