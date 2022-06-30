module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Candidates', [
      {
        name: 'Ada Lovelace'
      },
      {
        name: 'Alan Turing'
      },
      {
        name: 'Stephen Hawking'
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Candidates', null, {});
  }
};