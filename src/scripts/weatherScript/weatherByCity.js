const AK = "5defafb80b58284890d278857a0815d8";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${AK}&units=metric&lang=he&q=`;
let weatherInfo = document.querySelector('.weather-info')


// change the city
export default weatherInfo.addEventListener('click', () => {
    let city = prompt("Please Enter You'r City Name")
    if (city) {
        getApi(city)
        weatherInfo.setAttribute("title", `${city}`)
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

    weatherInfo.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon" />
        <p class="weather-text">${data.weather[0].description}, ${data.main.temp}°C</p>
    `;
}


