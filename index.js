function getWeather() {
  const apiKey = 'UaNZmTZPzk3xtJa7C63VQmrDSwAQxA1n'; 
  const locationInput = document.getElementById('location');
  const location = locationInput.value;

  if (!location) {
    alert('Please enter a location.');
    return;
  }

  const apiUrl = 'https://api.windy.com/api/forecast/v2/';

  // Windy API to get weather forecast
  fetch(`${apiUrl}?key=${apiKey}&q=${location}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayWeather(data) {
  const weatherResults = document.getElementById('weather-results');
  weatherResults.innerHTML = '';

  if (data) {
    const { place, days } = data;

    const title = document.createElement('h2');
    title.textContent = `Weather Forecast for ${place.name}, ${place.country}`;
    weatherResults.appendChild(title);

    days.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');

      const date = document.createElement('p');
      date.textContent = `Date: ${day.date}`;
      dayElement.appendChild(date);

      const temperature = document.createElement('p');
      temperature.textContent = `Temperature: ${day.temp2m.min}°C - ${day.temp2m.max}°C`;
      dayElement.appendChild(temperature);

      const description = document.createElement('p');
      description.textContent = `Weather: ${day.weather}`;
      dayElement.appendChild(description);

      weatherResults.appendChild(dayElement);
    });
  } else {
    weatherResults.textContent = 'Weather data not available.';
  }
}
