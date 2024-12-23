/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const apiKey = 'fe325f94c1c66c96481053100a7a3090';

// Event listener for the Generate button
document.getElementById('generate').addEventListener('click', generateWeather);

// Function to handle click and fetch weather data
function generateWeather() {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // Validate zip code
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipcode)) {
        alert('Please enter a valid zip code.');
        return;
    }

    getWeatherData(zipcode)
        .then(weatherData => {
            if (weatherData) {
                return postData('/add', {
                    date: newDate,
                    temperature: weatherData.main.temp,
                    content: feelings,
                });
            }
        })
        .then(() => updateUI())
        .catch(error => console.error('Error:', error));
}

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(zipcode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to POST data to the server
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

// Function to update the UI
async function updateUI() {
    try {
        const response = await fetch('/all');
        const data = await response.json();
        document.getElementById('date').textContent = `Date: ${data.date || ''}`;
        document.getElementById('temp').textContent = `Temp: ${data.temperature || ''}°F`;
        document.getElementById('content').textContent = `Feeling: ${data.content || ''}`;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}
