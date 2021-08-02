module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          description: 'Awesome post 1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          description: 'Awesome post 2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          description: 'Awesome post 3',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Posts', null, {})
}
