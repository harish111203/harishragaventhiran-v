const apiKey = "6989e80422955a23e62fc2f5212d4ba1"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    document.getElementById("weather-info").innerHTML = `
        <h2>${name}</h2>
        <img src="${icon}" alt="Weather icon">
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
