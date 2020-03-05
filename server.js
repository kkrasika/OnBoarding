var express=require('express');
var app=express();
let jwt = require('jsonwebtoken')

app.get('/',function(req,res)
{
res.send('Hello2 World!');
});
var server=app.listen(3001,function() {});

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

const username = "test"
const password = "test"

const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect();

pool1.on('error', err => {
    // ... error handler
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/api/v1/employees", ensureToken, (req, res, next) => {
	
	const JSRSASign = require("jsrsasign");
	const key = "$PraveenIsAwesome!";
	const header = {
			  alg: "HS512",
			  typ: "JWT"
			};
	

    employees = [];
    
    request = pool1.request();
    
    request.query('select * from Employee', function (err, result) {
        
        if (err) console.log(err)
       
    	const sHeader = JSON.stringify(header);
    	const sPayload = JSON.stringify(result.recordset);
    	// Generate the JWT
    	const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);
    	// Log it to the console.
    	// console.log("JSON Web Token: ", sJWT);
    	
        // send records as a response
        res.send(result.recordset);
        
    });
    
});

const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/api/v1/addemp',ensureToken, (req, res) => {
	
	console.log(req.body.name)
	  if(!req.body.name) {
	    return res.status(400).send({
	      success: 'false',
	      message: 'name is required'
	    });
	  } else if(!req.body.surname) {
	    return res.status(400).send({
	      success: 'false',
	      message: 'surname is required'
	    });
	  }
	 const todo = {
	   name: req.body.name,
	   surname: req.body.surname,
	   address:	req.body.address
	 }

	 const request = pool1.request()
	 request.input('name', sql.VarChar, req.body.name)
	 request.input('surname', sql.VarChar, req.body.surname)
	 request.input('address', sql.VarChar, req.body.address)
	 request.query('insert into employee (name, surname, address) values (@name, @surname, @address)', (err, result) => {
		 console.log("Error Ocurred : ", err);
		 console.log("Result : "+result)
	 })
	 
	 return res.status(201).send({
	   success: 'true',
	   message: 'todo added successfully',
	   todo
	 })
	});


app.post('/api/v1/login',(req, res) => {
	 let p_username = req.body.username
	 let p_password = req.body.password
	 if(p_username == username && p_password == password){
		  var token = jwt.sign(
		   { username: username, 
			 exp: Math.floor(Date.now() / 1000) + (60*60)}, 
		   'secretkey',
		   (err, token) => {
		     res.send({
		      ok: true,
		      message: "Login successful",
		      token:token
		     })
		   })
		   console.log(token)
		 } else {
		  res.send({
		   ok: false,
		   message: "Username or password incorrect"
		  })
		 }
	})

function ensureToken(req, res, next) {

	 var bearerHeader = req.headers["authorization"]
	 if(typeof bearerHeader !== 'undefined') {
		 const bearer = bearerHeader.split(" ")
		 const bearerToken = bearer[1]

			jwt.verify(bearerToken, 'secretkey', (err, result) => {
			    if(err) { res.sendStatus(403) }
			    else{ next() }
			 } 	);	 
	} else {
		  res.sendStatus(403)
	 }

	console.log("sent success")
}