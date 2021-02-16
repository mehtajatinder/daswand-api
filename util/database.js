const dbConnection = require("mysql2");

const dbPool = dbConnection.createPool({
  host: "localhost",
  database: "dasvand",
  user: "root",
  password: "fragile",
});

module.exports = dbPool.promise();
