const API_KEY = '2d54b8e618d5491ad21d780ba2f02a23';
const form = document.querySelector('#weatherForm');
const cityInput = document.querySelector('#city');
const weatherDisplay = document.querySelector('#weatherDisplay');
const historyList = document.querySelector('#historyList');
const consoleOutput = document.querySelector('#consoleOutput');

//--- HELPER: On-Screen Console ---
// This function adds text to our black console box
function logToScreen(message) {
    const logItem = document.createElement('p');
    logItem.textContent = "> " + message;
    consoleOutput.appendChild(logItem);
}

// ---  Storage (Local Storage) ---
function saveToHistory(cityName) {
    // Get old history or an empty array if nothing exists yet
    let history = JSON.parse(localStorage.getItem('weatherCities')) || [];

    // Add new city only if it is not already in the list
    if (history.includes(cityName) === false) {
        history.push(cityName);
        localStorage.setItem('weatherCities', JSON.stringify(history));
        showHistory(); // Update the list on the screen
    }
}

function showHistory() {
    // Get history from storage
    let history = JSON.parse(localStorage.getItem('weatherCities')) || [];
    
    // Clear the current list on screen
    historyList.innerHTML = '';

    // Loop through history and create list items
    for (let i = 0; i < history.length; i++) {
        const li = document.createElement('li');
        li.textContent = history[i];

        // Event Handling (Clicking history to search again)
        li.addEventListener('click', function() {
            cityInput.value = history[i];
            getWeather(history[i]);
        });

        historyList.appendChild(li);
    }
}

// --- Async/Await, Fetch API, and Error Handling ---
async function getWeather(cityName) {
    // Clear previous results
    consoleOutput.innerHTML = '';
    weatherDisplay.innerHTML = 'Loading...';

    // Required Console Log #1
    logToScreen("start syncing");

    try {
        // Fetch data from OpenWeatherMap API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        // Check if city is invalid (e.g., 404 error)
        if (!response.ok) {
            throw new Error("City not found");
        }

        // Convert response to JSON
        const data = await response.json();

        // Required Console Log #2
        logToScreen("data get successfully");

        // Display the weather data on screen
        weatherDisplay.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].main}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;

        // Save valid city to local storage
        saveToHistory(data.name);

    } catch (error) {
        // Required Console Log #3 (Runs if invalid city or network error)
        logToScreen("failed");

        // Show error message in the weather display area
        weatherDisplay.innerHTML = `<p style="color:red; font-weight:bold;">Error: ${error.message}</p>`;
    }
}

// ---  Event Handling Basics ---
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page from refreshing
    
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

// Load the search history automatically when the script runs
showHistory();