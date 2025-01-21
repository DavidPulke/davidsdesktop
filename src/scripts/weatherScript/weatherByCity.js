let AK = import.meta.env["VITE_WEATHER_KEY"];
let WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${AK}&units=metric&lang=he&q=`;
let WI = document.querySelector('.weather-info')


// change the city
export default WI.addEventListener('click', () => {
    let city = prompt("Please Enter You'r City Name")
    if (city) {
        getApi(city)
        WI.setAttribute("title", `${city}`)
        localStorage.setItem('weatherLocation', city)
    } else {
        alert('Invalid Input!')
    }
})

async function getApi(city) {
    try {
        let response = await fetch(WEATHER_URL + city)
        let data = await response.json()
        showWeatherData(data)
    } catch (error) {
        alert(new Error(error))
    }
}



// הצגת המידע על מזג האוויר בפוטר עם אייקון וטקסט תיאור
function showWeatherData(data) {
    // יצירת הקישור לאייקון מזג האוויר
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    WI.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
        <p class="weather-text">${data.weather[0].description}, ${data.main.temp}°C</p>
    `;
}


