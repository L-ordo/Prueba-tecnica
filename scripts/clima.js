
const mapboxApiKey = 'pk.eyJ1IjoibHVpczEwMTcwMyIsImEiOiJjbGJ5bHNiZm0zYzl3M3JwamZ0bW96aW5nIn0.wwEhhAWnO5x-sNkZXwo71Q'; // Reemplaza con tu API key de Mapbox
const openWeatherApiKey = 'afe2c6e8850aa22c801727d4bcc71e9e'; // Reemplaza con tu API key de OpenWeatherMap

// Creamos la función para obtener las coordenadas de una ciudad usando Mapbox
async function getCoordinates(city) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapboxApiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener las coordenadas');
        }
        const data = await response.json();
        const coordinates = data.features[0].geometry.coordinates;
        return coordinates;
    } catch (error) {
        throw new Error('No se pudo obtener las coordenadas');
    }
}

// Creamos la función para obtener el clima usando las coordenadas
async function getWeather() {
    const city = document.getElementById('city').value;

    try {
        const coordinates = await getCoordinates(city);
        const [lon, lat] = coordinates;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${openWeatherApiKey}`;
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error('Error al obtener el clima');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        document.getElementById('weatherResult').innerHTML = 'No se pudo obtener el clima. Verifica el nombre de la ciudad.';
    }
}

// Creamos la función para mostrar el clima en el DOM
function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>Clima en ${data.name}, ${data.sys.country}</h2>
        <p>Temperatura: ${data.main.temp} °C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Condiciones: ${data.weather[0].description}</p>
    `;
}

// Event listener para el botón
document.getElementById('getWeather').addEventListener('click', getWeather);
