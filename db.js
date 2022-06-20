var express = require('express');
var app = express();
const file = './visitCounterDB.db';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);


db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS visitor(name STRING, count NUMBER)");
    
    //insert data
    // var sqlInsert = 'INSERT INTO visitor(name,count) VALUES (?,?)';
    // db.run(sqlInsert, ['page','1']);

    // var sqlSELEC = 'SELECT count FROM visitor where name="page"';
    // db.each(sqlSELEC, function (err, row) {
    //     console.log('count = ' + row.count);
    // });
});

// db.close();

module.exports = db
