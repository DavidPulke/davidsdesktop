let API_KEY = import.meta.env.VITE_WEATHER_KEY;
let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lang=he&`;

// get location by ip
export default async function getLocationByIP() {
    try {
        let response = await fetch('https://ipinfo.io/json?token=a723988d90a66d');
        let data = await response.json();
        let [lat, lon] = data.loc.split(",");
        getWeatherByLocation(lat, lon);
    } catch (error) {
        console.log("שגיאה בקבלת המיקום שלך: " + error.message);
    }
}

// getting the weather by the lat and lon
async function getWeatherByLocation(lat, lon) {
    try {
        let response = await fetch(`${WEATHER_URL}lat=${lat}&lon=${lon}`);
        let data = await response.json();
        showWeatherData(data);
    } catch (error) {
        alert("שגיאה בקבלת המידע ממזג האוויר: " + error.message);
    }
}


let weatherInfo = document.querySelector('.weather-info')
function showWeatherData(data) {

    // the weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
        <p class="weather-text">${data.weather[0].description}, ${data.main.temp}</p>°C
    `;
}



// getting the weather by the typed location
let lastCity = localStorage.getItem('weatherLocation')
if (lastCity) {
    const cityURL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lang=he&q=`;
    async function getApi(lastCity) {
        try {
            let response = await fetch(cityURL + lastCity)
            let data = await response.json()
            showWeatherData(data)
        } catch (error) {
            alert(new Error(error))
        }
    }
    getApi(lastCity)
    weatherInfo.setAttribute("title", `${lastCity}`)

    function showWeatherData(data) {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
        <p class="weather-text">${data.weather[0].description}, ${Math.floor(data.main.temp)}°</p>
    `;

    }
} else {
    getLocationByIP();
}




