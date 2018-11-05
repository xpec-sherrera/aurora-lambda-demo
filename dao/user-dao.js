const dbConnector = require('./../connector/mysql-connector');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports.UserDAO = function(){
    this.insert = async((user) => {
        return await(dbConnector.query("INSERT INTO User SET ?", user));
    });
};
