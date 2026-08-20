# Weather Journal App

A small full-stack app that logs how you're feeling next to the current weather. Enter a zip code and a note about your day, and the app fetches live weather data, saves the entry server-side, and reflects it back in the UI.

## How it works

1. The front end takes a zip code and a short journal entry.
2. It calls a small Express route (/weather) which proxies the OpenWeatherMap API server-side, keeping the API key out of the browser.
3. It posts the entry (temperature, date, note) to the server, which holds the latest entry in memory.
4. The UI fetches that entry back and renders it - date, temperature, and note.

## Stack

- Backend: Node.js, Express, body-parser, cors, dotenv
- Frontend: Vanilla JavaScript (fetch, async/await), HTML, CSS - no framework
- Data: In-memory on the server (no database - by design, this was a Udacity Front End Nanodegree exercise focused on async JS and API calls)

## Running it locally

Copy .env.example to .env and add your own OpenWeatherMap key (free at openweathermap.org/api), then:

npm install
npm start

Then open http://localhost:3000.

## Security note

Earlier versions of this project shipped the OpenWeatherMap key directly in the client-side JS. That's been fixed - the key now lives server-side only, read from an environment variable, and the browser calls our own /weather proxy route instead of OpenWeatherMap directly. Flagging it here rather than pretending it was always this way.
