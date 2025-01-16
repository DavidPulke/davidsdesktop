// script.js
const apiKey = 'something';
const searchButton = document.getElementById('searchButton');
const searchModal = document.getElementById('searchModal');
const closeModal = document.querySelector('.close');
const submitSearch = document.getElementById('submitSearch');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const playerSidePanel = document.getElementById('playerSidePanel');
const playerContainer = document.getElementById('playerContainer');
const closePlayer = document.getElementById('closePlayer');
const expandButton = document.getElementById('expandButton');

// הצגת חלון החיפוש
searchButton.addEventListener('click', () => {
    searchModal.style.display = 'block';
});

// סגירת חלון החיפוש
closeModal.addEventListener('click', () => {
    searchModal.style.display = 'none';
});

// ביצוע חיפוש
submitSearch.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`);
    const data = await response.json();

    displayResults(data.items);
});

// הצגת תוצאות
function displayResults(videos) {
    results.innerHTML = ''; // נקה תוצאות קודמות
    videos.forEach(video => {
        const li = document.createElement('li');
        li.textContent = video.snippet.title;
        li.addEventListener('click', () => playVideo(video.id.videoId));
        results.appendChild(li);
    });
}

// ניגון שיר
function playVideo(videoId) {
    playerContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    playerSidePanel.style.display = 'flex'; // הצגת חלון צדדי
    searchModal.style.display = 'none'; // סגירת חלון החיפוש
}

// סגירת חלון הנגן
closePlayer.addEventListener('click', () => {
    playerSidePanel.style.display = 'none';
    playerContainer.innerHTML = ''; // ניקוי הנגן
});

// מעבר למצב מסך מלא
expandButton.addEventListener('click', () => {
    playerSidePanel.classList.toggle('fullscreen');
});

async function searchVideos(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            alert('לא נמצאו תוצאות.');
            return;
        }

        displayResults(data.items);
    } catch (error) {
        console.error('שגיאה בבקשת ה-API:', error);
        alert('אירעה שגיאה במהלך החיפוש. נסה שוב מאוחר יותר.');
    }
}

// קריאה לפונקציה הזו בחיפוש:
submitSearch.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return;
    searchVideos(query);
});

