const dbConnection = require("mysql2");

const dbPool = dbConnection.createPool({
  host:'127.0.0.1',
  user:'root',
  database:'daswand',
  password: '#admin2021'
});

module.exports = dbPool.promise();
