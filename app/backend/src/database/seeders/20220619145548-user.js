module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'michael@jackson.com',
        password: 'secret',
        role: 'user'
      },
      {
        email: 'madonna@email.com',
        password: 'secret',
        role: 'admin'
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};