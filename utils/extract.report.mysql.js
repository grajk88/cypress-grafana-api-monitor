var fs = require("fs");
var jp = require('jsonpath');
var mysql = require('mysql');

// Get content from file
var contents = fs.readFileSync("./cypress/results/mochawesome.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

var testExecutionTime = jp.query(jsonContent, '$.stats.start').toString();
testExecutionTime = testExecutionTime.replace('T', ' ')
testExecutionTime = testExecutionTime.slice(0,-5)

// MySQL DataBase

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_cypress_api_monitor"
});

// Extract and Iterate
var resultsArray = jp.query(jsonContent, '$..results[0].suites[0].tests[*]');

for (let index = 0; index < resultsArray.length; index++) {

    var serviceNameValue = jp.query(jsonContent, '$.results[0].suites[0].tests['+index+'].title');
    var statusValue = jp.query(jsonContent, '$.results[0].suites[0].tests['+index+'].state');
    if(statusValue=="passed"){
      statusValue = 200
    }
    else{
      statusValue = 500
    }
    var responseTimeValue = jp.query(jsonContent, '$.results[0].suites[0].tests['+index+'].duration');

    console.log("Service Names ", serviceNameValue);
    console.log("Status ", statusValue);
    console.log("Response Time", responseTimeValue);

  
    var sql = "INSERT INTO tbl_api_status_details (serviceName, status, responseTime, time_executed) VALUES ('"+serviceNameValue+"','"+ statusValue+"','"+ responseTimeValue+"','"+testExecutionTime+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
        // console.log("1 record inserted");
    });
}

con.end();