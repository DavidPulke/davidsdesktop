// searchSpotify.js
export const ci = import.meta.env['VITE_API_CLIENT_ID'];
export const cs = import.meta.env['VITE_API_CLIENT_KEY'];


// vars
const playerDiv = document.getElementById('spotify-player');

// get access token
export async function getAccessToken() {
    try {
        let response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(ci + ':' + cs),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error:', error);
    }
}

// search songs
export async function searchSpotify(query) {
    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    return data.tracks.items;
}

// display results
export function displayResults(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (tracks.length === 0) {
        resultsContainer.innerHTML = '<p>לא נמצאו תוצאות</p>';
    } else {
        tracks.forEach(track => {
            const div = document.createElement('div');
            div.classList.add('result-item');
            div.innerHTML = `
                <img src="${track.album.images[0].url}" alt="${track.name}">
                <div class="songDetails">
                <h3>${track.name}</h3>
                <p>ביצוע: ${track.artists.map(artist => artist.name).join(', ')}</p>
                <button class="playButton" data-track-id="${track.id}">Listen</button>
                </div>
            `;
            resultsContainer.appendChild(div);
        });

        const playButtons = document.querySelectorAll('.playButton');
        playButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const trackId = event.target.getAttribute('data-track-id');
                playTrack(trackId);
            });
        });
    }
};




// play song
export function playTrack(trackId) {
    if (playerDiv.classList.contains('minimized')) {
        playerDiv.classList.remove('minimized');
    }

    playerDiv.classList.remove('hidden');
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
    iframe.width = '100%';
    iframe.height = '380';
    iframe.frameBorder = '0';
    iframe.allow = 'encrypted-media';

    playerDiv.innerHTML = `
    <div class="tools">
      <i class="fa-solid fa-grip-lines" id="minimizePlayer"></i>
      <i class="fa-solid fa-x"  id="closeTrack"></i>
    </div>
  `;

    playerDiv.appendChild(iframe);

    // closeTrack
    const closeTrackBtn = document.getElementById('closeTrack');
    const closeTrack = () => {
        playerDiv.removeChild(iframe);
        closeTrackBtn.classList.add("hidden")
    };
    closeTrackBtn.addEventListener('click', closeTrack);

    // minimizePlayer
    const minimizePlayerBtn = document.getElementById('minimizePlayer');
    const minimizePlayer = () => {
        playerDiv.classList.toggle('minimized');
        if (playerDiv.classList.contains('minimized')) {
            iframe.style.display = 'none';
        } else {
            iframe.style.display = 'block';
        }
    };
    minimizePlayerBtn.addEventListener('click', minimizePlayer);
}






let spotifyContainer = document.getElementById('spotifyContainer');
if (localStorage.spotifyTheme == 'Dark') {
    spotifyContainer.classList.add("darkMode-spotify")
};




let closeSpotifyBtn = document.getElementById('closeSpotify');
let extandSpotifyBtn = document.getElementById('fullScreenSpotify');
let fullScreen = false;


let closeSpotify = () => {
    spotifyContainer.style.visibility = "hidden"
    spotifyContainer.style.opacity = "0"
};

function extandSpotify() {
    if (fullScreen) {
        spotifyContainer.classList.remove('fullScreen');
        fullScreen = false
    } else {
        spotifyContainer.classList.add('fullScreen');
        fullScreen = true
    }
};

if (closeSpotifyBtn) {
    closeSpotifyBtn.addEventListener('click', closeSpotify)
};

if (extandSpotifyBtn) {
    extandSpotifyBtn.addEventListener('click', extandSpotify)
};



