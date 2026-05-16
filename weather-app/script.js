const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const errorMsg = document.getElementById('errorMsg');

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});

async function searchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            showError('City not found. Please try another.');
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
        );
        const weatherData = await weatherResponse.json();

        displayWeather(weatherData.current, name, country);
        displayForecast(weatherData.daily);
        hideError();
    } catch (error) {
        showError('Error fetching weather data. Try again.');
    }
}

function displayWeather(current, city, country) {
    document.getElementById('cityName').textContent = `${city}, ${country}`;
    document.getElementById('temperature').textContent = Math.round(current.temperature_2m) + '°C';
    document.getElementById('weatherDesc').textContent = getWeatherDesc(current.weather_code);
    document.getElementById('weatherIcon').textContent = getWeatherIcon(current.weather_code);
    document.getElementById('feelsLike').textContent = Math.round(current.apparent_temperature) + '°C';
    document.getElementById('humidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('windSpeed').textContent = Math.round(current.wind_speed_10m) + ' km/h';
    document.getElementById('pressure').textContent = Math.round(current.pressure_msl) + ' mb';
}

function displayForecast(daily) {
    const forecastItems = document.getElementById('forecastItems');
    forecastItems.innerHTML = '';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 5; i++) {
        const date = new Date(daily.time[i]);
        const dayName = days[date.getDay()];
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const code = daily.weather_code[i];

        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <div class="day">${dayName}</div>
            <div class="icon">${getWeatherIcon(code)}</div>
            <div class="temp-range">${maxTemp}°/${minTemp}°</div>
        `;
        forecastItems.appendChild(item);
    }
}

function getWeatherIcon(code) {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 85) return '❄️';
    if (code >= 80 && code <= 82) return '⛈️';
    return '🌡️';
}

function getWeatherDesc(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight showers',
        81: 'Moderate showers',
        82: 'Violent showers',
        85: 'Snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with hail'
    };
    return descriptions[code] || 'Unknown';
}

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('show');
}

function hideError() {
    errorMsg.classList.remove('show');
}
