const Sequelize = require('sequelize')
const db = require('../db')

const Priority = db.define('priority', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  priority: {
    type: Sequelize.INTEGER
  }
})

Priority.afterCreate(async instance => {
  const nextPriority =
    (await Priority.findAll({
      where: {userId: instance.userId}
    }).length) + 1
  instance.setDataValue('priority', nextPriority)
})

module.exports = Priority
