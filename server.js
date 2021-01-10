// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());
// Initialize the main project folder
// app.use('/website',express.static('website'));
app.use(express.static(__dirname + '/website'));


// Routes
app.get('/',function(req,res){
	 res.sendFile('./website/index.html', { root: __dirname });
});
// making get route to contain our projectData
app.get('/get-data',function(req,res){
	res.send(projectData);
});
// making post route so we can store the data we get from the api endpoint
app.post('/post-data',function(req,res){
	 projectData = {
		temperature : req.body.temp,
		date: req.body.date,
		userResponse: req.body.response
	};
	// projectData = newData;
	// projectData.length= 0;
	// projectData.push(newData);
	
	res.send(projectData);
	// console.log(projectData);

});

// Setup Server
app.listen(process.env.PORT || 3000, ()=>{

	console.log("The server is running on http://localhost:3000")
});