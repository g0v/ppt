'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.changeColumn('ProgressReportHistories', 'brief', Sequelize.TEXT);
    queryInterface.changeColumn('ProgressReportHistories', 'reference', Sequelize.TEXT);

    queryInterface.changeColumn('Commitments', 'brief', Sequelize.TEXT);
    queryInterface.changeColumn('Commitments', 'content', Sequelize.TEXT);
    queryInterface.changeColumn('Commitments', 'reference', Sequelize.TEXT);

    queryInterface.changeColumn('ProgressRatings', 'comment', Sequelize.TEXT);

    queryInterface.changeColumn('Policies', 'name', Sequelize.TEXT);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.changeColumn('ProgressReportHistories', 'brief', Sequelize.STRING);
    queryInterface.changeColumn('ProgressReportHistories', 'reference', Sequelize.STRING);

    queryInterface.changeColumn('Commitments', 'brief', Sequelize.STRING);
    queryInterface.changeColumn('Commitments', 'content', Sequelize.STRING);
    queryInterface.changeColumn('Commitments', 'reference', Sequelize.STRING);

    queryInterface.changeColumn('ProgressRatings', 'comment', Sequelize.STRING);

    queryInterface.changeColumn('Policies', 'name', Sequelize.STRING);

  }
};
