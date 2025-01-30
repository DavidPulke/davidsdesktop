import { aboutText, defaultText } from "./code-text";
let flag = false
let aboutFlag = false;
let editor;
let editorObject = {
    value: defaultText.join('\n'),
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true
};



require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs' } });

// Reload the Editor
require(['vs/editor/editor.main'], function () {
    // Creat Monaco Editor
    editor = monaco.editor.create(document.getElementById('editor'), editorObject);
});




let extend = document.getElementById('extend')
let codeContainer = document.getElementById('VSCode')
let closeCode = document.getElementById('close-code-btn')
let codeNav = document.querySelector('.code-nav');
let showFiles = document.querySelector('.filesBtn');
let filesNav = document.querySelector('.filesNav');
let aboutBtn = document.querySelector('.aboutBtn');
let fullScreen = false;
let openCode = false;

function extendFunc() {
    if (fullScreen) {
        codeContainer.classList.remove('fullScreen');
        fullScreen = false
    } else {
        codeContainer.classList.add('fullScreen');
        fullScreen = true
    }
}

export function openCodeFunc() {
    if (openCode) {
        // close
        codeContainer.classList.remove('show');
        codeContainer.classList.add('hidden');
        openCode = false
    } else {
        // open
        codeContainer.classList.remove('hidden');
        codeContainer.classList.add('show');
        openCode = true
    }
}

export function bringToFront() {
    codeContainer.style.zIndex = '1001'
}



// navigate to files || main code
function showFilesFunc() {
    if (flag) {
        filesNav.style.width = '0px'
        showFiles.classList.remove('navLinkActive')
        flag = false
    } else {
        flag = true
        filesNav.style.width = '150px';
        showFiles.classList.add('navLinkActive');
    };
    aboutFlag = false
    aboutBtn.classList.remove('navLinkActive');
    // make that edior as been uploaded to the window
    if (editor) {
        editor.setValue(aboutFlag ? aboutText.join('\n') : defaultText.join('\n'));
    } else {
        console.warn("Monaco Editor לא נטען עדיין!");
    }

}

if (filesNav.style.width != '0px') {
    flag = true
    showFiles.classList.add('navLinkActive')
}


// navigate to about || about the project
function showAboutFunc() {
    aboutFlag = !aboutFlag;
    aboutBtn.classList.toggle('navLinkActive', aboutFlag);
    showFiles.classList.remove('navLinkActive');

    // make that edior as been uploaded to the window
    if (editor) {
        editor.setValue(aboutFlag ? aboutText.join('\n') : defaultText.join('\n'));
    } else {
        console.warn("Monaco Editor לא נטען עדיין!");
    }
}




// event listners for click
extend.addEventListener('click', extendFunc)
closeCode.addEventListener('click', openCodeFunc)
codeNav.addEventListener('dblclick', extendFunc)
showFiles.addEventListener('click', showFilesFunc)
aboutBtn.addEventListener('click', showAboutFunc)




// open spotify
let spotifyBtn = document.getElementById('spotify');
let spotifyDesktopBtn = document.querySelector('.spotifyBtn');
let spotifyContainer = document.getElementById('spotifyContainer')

export function displaySpotify() {

    spotifyContainer.style.visibility = "visible"
    spotifyContainer.style.opacity = "1"

};


// to open spotify in vscode
spotifyBtn.addEventListener('click', displaySpotify)

// to open spotify in the desktop
spotifyDesktopBtn.addEventListener('dblclick', displaySpotify)



let vscodeBtn = document.querySelector('.vscodeBtn');
let vscodeContainer = document.getElementById('VSCode')

//  open vscode
export function displayVscode() {
    vscodeContainer.classList.add('show')
};

// to open spotify in the desktop
vscodeBtn.addEventListener('dblclick', openCodeFunc);


