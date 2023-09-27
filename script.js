const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your actual API key

async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const unit = document.querySelector('input[name="unitToggle"]:checked').value;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            displayError(data.message);
        }
    } catch (error) {
        displayError('An error occurred. Please try again later.');
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const unitSymbol = data.main.temp > 0 ? '°' : '°';

    weatherDisplay.innerHTML = `
        <h2>Weather for ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} ${unitSymbol}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}

function displayError(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    errorDisplay.innerHTML = `<p class="error">${message}</p>`;
}