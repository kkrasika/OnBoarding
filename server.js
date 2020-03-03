var express=require('express');
var app=express();
app.get('/',function(req,res)
{
res.send('Hello2 World!');
});
var server=app.listen(3001,function() {});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/api/v1/employees", (req, res, next) => {
	
	var sql = require("mssql");
	
    var config = {
            user: 'onboarding',
            password: '1Welcome$',
            server: 'localhost', 
            database: 'onboarding',
            options: {
                encrypt: false
            }
        };
    
    employees = [];
    
    sql.connect(config, function (err) {
        
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        
        request.query('select * from Employee', function (err, result) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(result.recordset);             
        });
    });
    
	});