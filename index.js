const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session')

let HTTP_PORT = 8080 
var db = require("./db.js")
var viewCount = 1;

app.use(session({
    secret: 'chest',
    name: 'viewcountercheck',
}));

let getCountSql = "select count from visitor where name='page'";
let updateCountSql = "UPDATE visitor set count = COALESCE(?,count) WHERE name = ?";
let insertCountSql = 'INSERT INTO visitor(name,count) VALUES (?,?)';

async function db_all(query){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

app.get("/api/getcount", cors(), async function (req, res) {
    if (!req.session.viewcountercheck){
        req.session.viewcountercheck = 'true';

        let rows = await db_all(getCountSql)

        if(rows.length == 0){
            await db.run(insertCountSql, ['page',1])
        }else{
            viewCount = rows[0]["count"];
            viewCount++;

            await db.run(updateCountSql, [viewCount,'page'])
        }

        res.json({
            "message":"Ok",
            "count": viewCount
        })
    }
   
    // res.send(`<h2>Counter: `+viewCount+'</h2>')
})

// Creating server to listen at localhost HTTP_PORT
app.listen(HTTP_PORT,function(req,res){
    // Logging when the server has started
    console.log("listening to server " + HTTP_PORT)
})
