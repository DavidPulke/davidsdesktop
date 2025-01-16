export default function updateTime() {
    let now = new Date();
    let currentHour = now.getHours().toString().padStart(2, '0');
    let currentMin = now.getMinutes().toString().padStart(2, '0');
    let currentSecond = now.getSeconds().toString().padStart(2, '0');

    let timeString = `${currentHour}:${currentMin}:${currentSecond}`;
    let timeElement = document.getElementById('time');

    if (timeElement) {
        timeElement.textContent = timeString;
    }

    // הצגת תאריך לועזי בפורמט רגיל
    let gregorianDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    let dateElement = document.getElementById('date');

    if (dateElement) {
        dateElement.textContent = gregorianDate; // הצגת תאריך לועזי תמיד
    }

    // יצירת תאריך לועזי בפורמט עברי עבור title
    const hebrewFormattedDate = getFormattedHebrewDate(now); // פונקציה שתמיר תאריך לפורמט בעברית
    const clockContainer = document.getElementById('clock-container');

    if (clockContainer) {
        clockContainer.setAttribute('title', hebrewFormattedDate); // הוספת תאריך בעברית ל-title
    }
}

// פונקציה ליצור תאריך לועזי בעברית
function getFormattedHebrewDate(date) {
    // שימוש בפורמט עבור תאריך לועזי בעברית
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('he-IL', options); // מחזיר את התאריך הלועזי בעברית
}

// עדכון השעה כל שנייה
setInterval(updateTime, 1000);
updateTime(); // עדכון ראשון כאשר הטעינה מתבצעת



