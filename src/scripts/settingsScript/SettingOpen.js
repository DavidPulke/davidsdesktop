let settingsBox = document.querySelector('.settings')
let settingsBtn = document.querySelector('.settingsBtn')


export default settingsBtn.addEventListener('mouseover', () => {
    settingsBox.style.display = 'block'
})

settingsBox.addEventListener('mouseleave', () => {
    settingsBox.style.display = 'none'
})


function background(event) {
    const file = event.target.files[0];
    if (!file) return;  // Exit if no file is selected
    const reader = new FileReader();
    reader.onload = function (e) {
        document.querySelector("body").style.backgroundImage = `url(${e.target.result})`;

        // Save the background in localStorage
        localStorage.setItem('backgroundImage', e.target.result);
    };
    reader.readAsDataURL(file);
}

// Create the file input button and label dynamically
let backgroundLabel = document.createElement('label');
backgroundLabel.setAttribute('for', 'file-upload');
backgroundLabel.setAttribute('title', "Change You'r Background")
backgroundLabel.innerHTML = `<i class="fa-solid fa-image"></i>`;

let backgroundBtn = document.createElement('input');
backgroundBtn.setAttribute('type', 'file');
backgroundBtn.setAttribute('id', 'file-upload');
backgroundBtn.setAttribute('accept', 'image/*');  // Accept only image files

// Attach the change event listener
backgroundBtn.addEventListener('change', background);

// Append the elements to the footer or anywhere on the page
document.querySelector('.footer').appendChild(backgroundLabel);
document.querySelector('.footer').appendChild(backgroundBtn);

// Load saved background from localStorage
window.onload = function () {
    const savedBackground = localStorage.getItem('backgroundImage');
    if (savedBackground) {
        document.querySelector("body").style.backgroundImage = `url(${savedBackground})`;
    }
};


let settingsData = [[backgroundBtn, backgroundLabel]]

for (let i in settingsData) {
    for (let element of settingsData[i]) {
        settingsBox.appendChild(element)
        settingsBox.appendChild(element)
    }
}