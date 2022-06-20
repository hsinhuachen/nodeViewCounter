var express = require('express');
var app = express();
var HTTP_PORT = 8080 
var db = require("./db.js")

async function db_all(query){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

app.get('/', async function (req, res) {
    let getCountSql = "select count from visitor where name='page'";
    let updateCountSql = "UPDATE visitor set count = COALESCE(?,count) WHERE name = ?";

    let rows = await db_all(getCountSql)
    var count = rows[0]["count"];
    count++;

    await db.run(updateCountSql, [count,'page'])
    res.send(`<h2>Counter: `+count+'</h2>')
});

// Creating server to listen at localhost HTTP_PORT
app.listen(HTTP_PORT,function(req,res){
    // Logging when the server has started
    console.log("listening to server " + HTTP_PORT)
})