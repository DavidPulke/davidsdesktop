export async function searchITunes() {
    const query = document.getElementById('searchQuery').value;
    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.log(error);
    }
}

export let volumeScale = 0.4;

function displayResults(tracks) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    tracks.forEach((track) => {
        const trackDiv = document.createElement('div');
        trackDiv.innerHTML = `
            <strong>${track.trackName}</strong> מאת ${track.artistName}
            <br>
            <audio class="audio-player" controls src="${track.previewUrl}"></audio>
        `;
        resultsDiv.appendChild(trackDiv);
    });

    const audioPlayers = document.querySelectorAll('.audio-player');
    audioPlayers.forEach(player => {
        player.volume = volumeScale;
    });

    initVolumeControl();
}

function initVolumeControl() {
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');

    if (volumeIcon && volumeSlider) {
        volumeSlider.addEventListener('input', () => {
            const volume = volumeSlider.value / 100;
            const audioPlayers = document.querySelectorAll('.audio-player');

            audioPlayers.forEach(player => {
                player.volume = volume;
            });

            volumeIcon.innerHTML = volume === 0
                ? '<i class="fa-solid fa-volume-xmark"></i>'
                : volume <= 0.5
                    ? '<i class="fa-solid fa-volume-low"></i>'
                    : '<i class="fa-solid fa-volume-high"></i>';
        });
    }
}


export function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // בדוק אם השדה מכיל טקסט בעברית, ואם כן, קבע את השפה לעברית
    const searchQuery = document.getElementById('searchQuery').value;
    const language = searchQuery.match(/[\u0590-\u05FF]/) ? 'he-IL' : 'en-US'; // זיהוי שפה
    recognition.lang = language; // הגדר את השפה לזיהוי קולי


    // השמעת אפקט צליל (לא מצריך הכנה מראש)
    const voiceFeedback = document.getElementById('voiceFeedback');
    if (voiceFeedback) {
        voiceFeedback.currentTime = 0; // מחזיר את הזמן לאפס
        voiceFeedback.play().catch(error => {
            console.error('Error playing audio feedback:', error);
        });
    }

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('searchQuery').value = transcript; // הכנס טקסט לשדה החיפוש
        searchITunes(); // בצע חיפוש אוטומטי
    };

    recognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
    };


    recognition.start(); // התחל זיהוי קולי
}


