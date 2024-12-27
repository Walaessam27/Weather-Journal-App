/* Global Variables */
const apiKey = 'fe325f94c1c66c96481053100a7a3090&units=imperial';
const serverUrl = 'http://localhost:3000'; 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener for the Generate button
document.getElementById('generate').addEventListener('click', async () => {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // Validate zip code
    if (!/^\d{5}(-\d{4})?$/.test(zipcode)) {
        alert('Please enter a valid zip code.');
        return;
    }

    try {
        // Fetch weather data
        const weatherData = await getWeatherData(zipcode);
        if (!weatherData || !weatherData.main) {
            alert('Failed to fetch weather data. Please check the ZIP code or try again later.');
            return;
        }

        // Send data to the server
        await postData(`${serverUrl}/add`, {
            date: newDate,
            temperature: weatherData.main.temp,
            content: feelings,
        });

        await updateUI();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(zipcode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather data fetch failed: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather API:', error);
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
        console.error('Error:', error);
    }
}

// Function to update the UI
async function updateUI() {
    try {
        const response = await fetch(`${serverUrl}/all`);
        const data = await response.json();
        document.getElementById('date').textContent = `Date: ${data.date || 'N/A'}`;
        document.getElementById('temp').textContent = `Temperature: ${data.temperature || 'N/A'}°F`;
        document.getElementById('content').textContent = `Feeling: ${data.content || 'N/A'}`;
    } catch (error) {
        console.error('Error updating:', error);
    }
}
