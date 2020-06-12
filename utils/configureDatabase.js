var mysql = require('mysql');

// Please configure the MySQL Credentials here. By deafult, root/<NO_PASSWORD> is configured.
var hostName = "localhost";
var db_username = "root"
var db_password = ""
var db_name = "db_cypress_api_monitor"
var db_tbl_name = "tbl_api_status_details"

var con = mysql.createConnection({
  host: hostName,
  user: db_username,
  password: db_password
});

  con.query("CREATE DATABASE "+db_name, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

    var sql = "CREATE TABLE "+db_name+"."+db_tbl_name+" (serviceName VARCHAR(255), status int, responseTime int, time_executed timestamp)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

con.end();