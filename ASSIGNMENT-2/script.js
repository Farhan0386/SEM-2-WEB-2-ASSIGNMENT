const API_KEY = '2d54b8e618d5491ad21d780ba2f02a23';

// Get the HTML elements we need to work with
const form = document.querySelector('#weatherForm');
const cityInput = document.querySelector('#city');
const weatherDisplay = document.querySelector('#weatherDisplay');
const historyList = document.querySelector('#historyList');
const consoleOutput = document.querySelector('#consoleOutput');


function logToScreen(message) {
    const p = document.createElement('p');
    p.textContent = "> " + message;
    consoleOutput.appendChild(p);
}


async function getWeather(cityName) {
    weatherDisplay.innerHTML = "Loading...";
    consoleOutput.innerHTML = ""; // Clear console
    
    logToScreen("start syncing");

    try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        // Check if the city exists
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        logToScreen("data get successfully");

        
        weatherDisplay.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temp: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;

        saveCity(data.name); 

    } catch (error) {
        logToScreen("failed");
        weatherDisplay.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}


function saveCity(city) {
    let history = JSON.parse(localStorage.getItem('weatherCities')) || [];
    
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherCities', JSON.stringify(history));
    }
    showHistory();
}

function showHistory() {
    let history = JSON.parse(localStorage.getItem('weatherCities')) || [];
    historyList.innerHTML = "";

    for (let i = 0; i < history.length; i++) {
        const li = document.createElement('li');
        li.textContent = history[i];
        
       
        li.onclick = function() {
            getWeather(history[i]);
        };
        historyList.appendChild(li);
    }
}


form.onsubmit = function(event) {
    event.preventDefault(); 
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
};


showHistory();