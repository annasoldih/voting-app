module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Votes', [
      {
        candidate_id: 1
      },
      {
        candidate_id: 2
      },
      {
        candidate_id: 3
      },
      {
        candidate_id: 2
      },
      {
        candidate_id: 1
      },
      {
        candidate_id: 1
      },
      {
        candidate_id: 3
      },
      {
        candidate_id: 2
      },
      {
        candidate_id: 1
      },
      {
        candidate_id: 2
      },
      {
        candidate_id: 3
      },
      {
        candidate_id: 3
      },
      {
        candidate_id: 3
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Votes', null, {});
  }
};