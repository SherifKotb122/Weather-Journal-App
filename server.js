// Loads OWM_API_KEY (and anything else) from a local .env file in dev.
// Deployed environments (Railway/Render) set env vars directly - this is a no-op there.
require('dotenv').config();

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

// OpenWeatherMap key lives server-side only - never sent to the browser.
// Set OWM_API_KEY in your environment (or a local .env file, see .env.example).
const OWM_API_KEY = process.env.OWM_API_KEY;

// Routes
app.get('/',function(req,res){
	 res.sendFile('./website/index.html', { root: __dirname });
});

// Proxies the weather lookup so the API key never ships to the client.
app.get('/weather', async (req, res) => {
	const zip = req.query.zip;
	if (!zip) {
		return res.status(400).send({ error: 'zip query param is required' });
	}
	if (!OWM_API_KEY) {
		return res.status(500).send({ error: 'Server is missing OWM_API_KEY' });
	}
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(zip)}&appid=${OWM_API_KEY}&units=metric`;
		const response = await fetch(url);
		const data = await response.json();
		if (!response.ok) {
			return res.status(response.status).send(data);
		}
		res.send(data);
	} catch (err) {
		res.status(502).send({ error: 'Failed to reach weather service' });
	}
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
