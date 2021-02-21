const dbConnection = require("mysql2");

const dbPool = dbConnection.createPool({
  // host: "localhost",
  // database: "",
  // user: "root",
  // password: "fragile",
  host:'localhost',
  user:'root',
  database:'dasvand',
  password: 'fragile',
  //password: '@#dl9cau1183',

});

module.exports = dbPool.promise();
