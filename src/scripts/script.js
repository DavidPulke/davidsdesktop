import MoveName from "./foldersScript/Move&Name.js"
import settings from "./settingsScript/SettingOpen.js"
import OpenFolder from "./foldersScript/OpenFolder.js"
import getWeatherByLocation from "./weatherScript/weatherData.js"
import weatherByCity from "./weatherScript/weatherByCity.js"
import updateTime from "./timeZone/Date.js"
import DraggableFolder from "./foldersScript/WindowFolder.js"


import { searchSpotify, displayResults } from '../songs/script.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const query = searchInput.value;
            if (query) {
                searchSpotify(query)
                    .then(tracks => displayResults(tracks))
                    .catch(error => console.error('Error fetching search results:', error));
            }
        });
    }
});


let closeSpotifyBtn = document.getElementById('closeSpotify')
let spotifyContainer = document.getElementById('spotifyContainer')
let closeSpotify = () => {
    spotifyContainer.style.visibility = "hidden"
    spotifyContainer.style.opacity = "0"
}
if (closeSpotifyBtn) {
    closeSpotifyBtn.addEventListener('click', closeSpotify)
}




let fullSizeBtn = document.getElementById('fullSizeBtn');
let closeFullScreenBtn = document.getElementById('closeFullScreenBtn');


var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        fullSizeBtn.style.visibility = 'hidden';
        closeFullScreenBtn.style.visibility = 'visible';
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        fullSizeBtn.style.visibility = 'hidden';
        closeFullScreenBtn.style.visibility = 'visible';
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        fullSizeBtn.style.visibility = 'hidden';
        closeFullScreenBtn.style.visibility = 'visible';
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        fullSizeBtn.style.visibility = 'visible';
        closeFullScreenBtn.style.visibility = 'hidden';
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
        fullSizeBtn.style.visibility = 'visible';
        closeFullScreenBtn.style.visibility = 'hidden';
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
        fullSizeBtn.style.visibility = 'visible';
        closeFullScreenBtn.style.visibility = 'hidden';
    }
}




fullSizeBtn.addEventListener('click', openFullscreen)
closeFullScreenBtn.addEventListener('click', closeFullscreen)