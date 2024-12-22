/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API (replace YOUR_API_KEY with actual key)
const apiKey = 'YOUR_API_KEY'; 

// Create a new event listener for the generate button
document.getElementById("generate").addEventListener("click", generateWeather);

// Function to GET Web API Data
function getWeatherData(zipcode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call the POST method to send data to the server
            postData('/add', {
                date: newDate,
                temperature: data.main.temp,
                content: document.getElementById("feelings").value
            });
        })
        .catch(error => console.log('Error:', error));
}

// Function to POST data to the server
function postData(url = '', data = {}) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(() => {
        // Update the UI with the latest entry
        updateUI();
    })
    .catch(error => console.log('Error:', error));
}

// Function to update the UI with the most recent entry
function updateUI() {
    fetch('/all')
        .then(response => response.json())
        .then(allData => {
            const latestEntry = allData[allData.length - 1];
            document.getElementById('date').textContent = latestEntry.date;
            document.getElementById('temp').textContent = `Temp: ${latestEntry.temperature}°F`;
            document.getElementById('content').textContent = latestEntry.content;
        })
        .catch(error => console.log('Error:', error));
}

// Function to handle the click event and get weather data
function generateWeather() {
    const zipcode = document.getElementById("zip").value;
    if (zipcode) {
        getWeatherData(zipcode);
    } else {
        alert('Please enter a valid zipcode.');
    }
}
