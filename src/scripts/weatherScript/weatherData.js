const API_KEY = "5defafb80b58284890d278857a0815d8";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&lang=he&`; // הוספת ?lang=he לתמיכה בתיאור בעברית

// קבלת מיקום על בסיס IP
export default async function getLocationByIP() {
    try {
        let response = await fetch('https://ipinfo.io/json?token=a723988d90a66d');
        let data = await response.json();
        const [lat, lon] = data.loc.split(",");
        getWeatherByLocation(lat, lon); // שליחת המיקום ל-API של מזג האוויר
    } catch (error) {
        alert("שגיאה בקבלת המיקום שלך: " + error.message);
    }
}

// קבלת מזג אוויר לפי קווי רוחב ואורך
async function getWeatherByLocation(lat, lon) {
    try {
        let response = await fetch(`${WEATHER_URL}lat=${lat}&lon=${lon}`);
        let data = await response.json();
        showWeatherData(data); // קריאה לפונקציה שתציג את הנתונים בפוטר
    } catch (error) {
        alert("שגיאה בקבלת המידע ממזג האוויר: " + error.message);
    }
}

// הצגת המידע על מזג האוויר בפוטר עם אייקון וטקסט תיאור
let weatherInfo = document.querySelector('.weather-info')
function showWeatherData(data) {

    // יצירת הקישור לאייקון מזג האוויר
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
        <p class="weather-text">${data.weather[0].description}, ${data.main.temp}</p>°C
    `;
}

// קריאה לפונקציה לקבלת מיקום המשתמש על פי IP


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
    // הצגת המידע על מזג האוויר בפוטר עם אייקון וטקסט תיאור
    function showWeatherData(data) {
        // יצירת הקישור לאייקון מזג האוויר
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
        <p class="weather-text">${data.weather[0].description}, ${Math.floor(data.main.temp)}°</p>
    `;

    }
} else {
    getLocationByIP();
}




