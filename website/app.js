/* Global Variables */

// Weather lookups go through our own server (/weather?zip=...), which holds
// the OpenWeatherMap key server-side. No API key or third-party URL lives
// in the client anymore.

// adding event listener for the submit button to store our values when submit
document.getElementById('generate').addEventListener('click',function(){

const feelings = document.getElementById('feelings').value;
const zipCode = document.getElementById('zip').value;

		// calling the function to fetch weather data from our own server
		apiData(zipCode).then(function(data){
			let temp = data.main.temp;
			// calling the post function and give it the url and the data we got from the fetch and make a post request
			postData('/post-data',{temp:temp,response:feelings,date:newDate}).then((data)=>{
				// calling the get function so we can retrieve the data that we posted and then manipulate our UI
				getData().then(data=>{
					document.getElementById('date').innerHTML = data.date;
					document.getElementById('temp').innerHTML = data.temperature;
					document.getElementById('content').innerHTML = data.userResponse;
				});

			});
		});

});

	// fetching data from our own /weather proxy route (server holds the API key)
	 const apiData = async (zip) =>{

		const response = await fetch(`/weather?zip=${encodeURIComponent(zip)}`);
		const data = await response.json();
		return data;
	};


	// posting the data we got from api endpoint
	const postData = async (url ='', data={}) => {

		const response = await fetch (url,{
			method: 'POST',
    		mode: 'cors',
    		cache: 'no-cache',
  	  		credentials: 'same-origin',
  	  		headers: {'Content-Type': 'application/json'},
     		body: JSON.stringify(data)

		});
		 const dataBack = await response.json();
		 return dataBack;
	};

	// creating function that fetch the data from the prjectData object so we can update our UI
	const getData = async ()=>{
		const response = await fetch('/get-data');
		const uiData = await response.json();
		return uiData;
	}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
