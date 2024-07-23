// script.js
document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city or country name.');
    }
});

function getWeather(city) {
    const apiKey = 'cf50cf7a63427b9fa8bdbc1c639b7461';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again later.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temp = data.main.temp.toFixed(1);
    const feelsLike = data.main.feels_like.toFixed(1);
    const tempMin = data.main.temp_min.toFixed(1);
    const tempMax = data.main.temp_max.toFixed(1);
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;

    weatherInfo.innerHTML = `
        <div class="weather-detail pound-animation"><i class="fas fa-thermometer-half"></i> Temperature: <span>${temp} ℃</span></div>
        <div class="weather-detail"><i class="fas fa-temperature-low"></i> Feels Like: <span>${feelsLike} ℃</span></div>
        <div class="weather-detail"><i class="fas fa-temperature-high"></i> Minimum Temperature: <span>${tempMin} ℃</span></div>
        <div class="weather-detail"><i class="fas fa-temperature-high"></i> Maximum Temperature: <span>${tempMax} ℃</span></div>
        <div class="weather-detail"><i class="fas fa-tint"></i> Humidity: <span>${humidity} %</span></div>
        <div class="weather-detail"><i class="fas fa-compress-arrows-alt"></i> Pressure: <span>${pressure} hPa</span></div>
    `;

    // Show the weather info container with animation
    weatherInfo.classList.remove('hidden');
    weatherInfo.classList.add('animate__fadeIn');
}
