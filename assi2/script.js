const API_KEY = "0133cc5316757ac730cc46ee342334e4";

const form = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#city");
const weatherInfo = document.querySelector(".info");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchedCity = cityInput.value.trim();

    if (!searchedCity) {
        weatherInfo.innerHTML = `
            <h3>Weather Info</h3>
            <p>Please enter a city name.</p>
        `;
        return;
    }

    weatherInfo.innerHTML = `
        <h3>Weather Info</h3>
        <p>Loading...</p>
    `;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchedCity)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherInfo.innerHTML = `
            <h3>Weather Info</h3>
            <p>City: ${data.name}</p>
            <p>Temp: ${data.main.temp.toFixed(1)}°C</p>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        console.error(error);
        weatherInfo.innerHTML = `
            <h3>Weather Info</h3>
            <p>City not found or request failed.</p>
        `;
    }
});

function showHistory() {
    const history= JSON.parse(localStorage.getItem("searchHistory"))
    history.forEach((city) => {
        const listItem = document.createElement("li");
        listItem.textContent = city;
        document.querySelector("#historyList").appendChild(listItem);
    });
}
showHistory()


async function getData() {
    if(city){
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error("City not found");
            }
            return data;
        }
        catch (error) {
            console.error(error);
            return null;
        }