var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_neigerk',
  password        : '5971',
  database        : 'cs340_neigerk'
});
module.exports.pool = pool;
