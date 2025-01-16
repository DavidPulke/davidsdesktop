// האובייקט הקיים עם נתוני השירים
let guitarData = {
    songData: [
        { artist: 'אריק איינשטיין', song: 'יש בי אהבה', imgUrl: '', genre: 'רוק, זמר עברי', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'אבסורד', imgUrl: '', genre: 'רוק, זמר עברי', chordsUrl: '' },
        { artist: 'עידן עמדי', song: 'כאב של לוחמים', imgUrl: '', genre: 'פולק רוק, זמר עברי', chordsUrl: '' },
        { artist: 'עידן עמדי', song: 'אלייך', imgUrl: '', genre: 'פולק רוק, זמר עברי', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'תתארו לכם', imgUrl: '', genre: 'רוק, זמר עברי', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'נהר הדמעות', imgUrl: '', genre: 'רוק, זמר עברי', chordsUrl: '' },
        { artist: 'אריק איינשטיין', song: 'אני ואתה', imgUrl: '', genre: 'רוק, זמר עברי', chordsUrl: '' },
        { artist: 'בניה ברבי', song: 'מישהו איתי כאן', imgUrl: '', genre: 'פופ, זמרת', chordsUrl: '' },
        { artist: 'עידן רייכל', song: 'ממעמקים', imgUrl: '', genre: 'פופ, רוק', chordsUrl: '' },
        { artist: 'איל גולן', song: 'צליל מיתר', imgUrl: '', genre: 'מוזיקה מזרחית', chordsUrl: '' },
        { artist: 'זוהר ארגוב', song: 'הפרח בגני', imgUrl: '', genre: 'מוזיקה מזרחית', chordsUrl: '' },
        { artist: 'דודו טסה', song: 'אני רץ', imgUrl: '', genre: 'רוק, זמר עברי', chordsUrl: '' },
        { artist: 'חיים משה', song: 'נשבע', imgUrl: '', genre: 'מוזיקה מזרחית', chordsUrl: '' },
        { artist: 'פאר טסי', song: 'אחרי הנצח', imgUrl: '', genre: 'פופ, מרחית', chordsUrl: '' },
        { artist: 'שלומי שבת', song: 'יש לך', imgUrl: '', genre: 'מוזיקה מזרחית', chordsUrl: '' },
        { artist: 'מירי מסיקה', song: 'לשם', imgUrl: '', genre: 'פופ, זמרת', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'ירח', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'אבסורד', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'לתת ולקחת', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'תגידי', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'שלמה ארצי', song: 'והאמת', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'עידן עמדי', song: 'מפה לשם', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'עידן עמדי', song: 'בזמן האחרון', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
        { artist: 'עידן עמדי', song: 'אני רוצה', imgUrl: '', genre: 'פופ, זמר', chordsUrl: '' },
    ]
};



async function fetchArtistImage(artistName) {
    try {
        const encodedArtistName = encodeURIComponent(artistName);
        const response = await fetch(`https://he.wikipedia.org/w/api.php?action=query&titles=${encodedArtistName}&prop=pageimages&format=json&pithumbsize=500&origin=*`);
        const data = await response.json();

        // שליפת ה-ID של הדף
        const pageId = Object.keys(data.query.pages)[0];

        // בדיקת האם הדף נמצא
        if (pageId !== "-1") {
            const page = data.query.pages[pageId];
            if (page.thumbnail) {
                return page.thumbnail.source;
            } else {
                console.log(`אין תמונה זמינה עבור ${artistName}`);
                return '../images/defaultArtistImage.jpg';  // תמונה ברירת מחדל אם לא נמצאה תמונה
            }
        } else {
            console.error(`${artistName} לא נמצא ב-Wikipedia`);
            return '/images/defaultArtistImage.jpg';  // אם לא נמצא דף
        }
    } catch (error) {
        console.error('שגיאה בשליפת תמונת אמן:', error);
        return '/images/defaultArtistImage.jpg';  // במקרה של שגיאה
    }
}

for (let song of guitarData.songData) {
    if (!song.chordsUrl) {
        let artistFormatted = song.artist.replace(/ /g, '-');
        let songFormatted = song.song.replace(/ /g, '-');
        song.chordsUrl = `https://negina.co.il/chords/${artistFormatted}/${songFormatted}`;
    }
}

async function updateSongDataWithImages() {
    for (let song of guitarData.songData) {
        if (!song.imgUrl) {  // אם אין תמונה ידנית
            const imageUrl = await fetchArtistImage(song.artist);
            song.imgUrl = imageUrl;
        }

    }
}


window.onload(updateSongDataWithImages());





export default { ...guitarData };

