var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_jiaha',
  password        : '2645',
  database        : 'cs340_jiaha'
});
module.exports.pool = pool;
