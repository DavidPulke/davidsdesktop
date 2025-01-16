import projectsData from "../foldersData/ProjectsData.js";
import { searchITunes, startVoiceRecognition } from "../foldersData/MusicData.js";
import startTrexGame from "../../dino-game/scripts/index.js";
import GuitarData from "../foldersData/GuitarData.js";

import { openCodeFunc } from "../../VSCode/script.js";






export default document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.folder');

    folders.forEach(folder => {
        folder.addEventListener('dblclick', () => {
            const folderId = folder.id;
            const folderName = folder.dataset.name || loadFolderName(folderId);
            openFolder(folderName);
        });

        // VSCode music button Listener
        const musicButton = document.querySelector('.sidebar-btn.music');
        if (musicButton) {
            musicButton.addEventListener('click', () => {
                openFolder('Music');
            });
        }

        // VSCode Listener
        const vscodeButton = document.querySelector('.sidebar-btn i.fa-solid.fa-play');
        if (vscodeButton) {
            vscodeButton.addEventListener('click', () => {
                openFolder('VSCode');
            });
        }

    });







    function openFolder(folderName) {
        const folderWindow = document.getElementById('folder-window');
        const folderTitle = document.getElementById('folder-title');
        const folderContent = document.getElementById('folder-content');

        folderTitle.textContent = folderName; // change folder title
        folderContent.innerHTML = generateFolderContent(folderName); // loadng the folder data by the name of the folder

        folderWindow.style.display = 'block';
        document.getElementById('close-btn').addEventListener('click', closeFolder);

        document.getElementById('full-size-btn').addEventListener('click', fullSizeFolder);

        let openCodeBtn = document.getElementById('openCode')
        if (openCodeBtn) {
            openCodeBtn.addEventListener('click', openCodeFunc)
        }

        // update for the clicked / opend folder
        folderWindow.style.zIndex = 999999;



        folderContent.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'voiceRec') {
                startVoiceRecognition();
            }
            if (event.target && event.target.id === 'searchButton') {
                searchITunes();
            }
        });


        // update fot all the other folders z-index
        const otherFolders = document.querySelectorAll('.folder-window');
        otherFolders.forEach(otherFolder => {
            if (otherFolder !== folderWindow) {
                otherFolder.style.zIndex = 1;
            }
        });
    }


});



function closeFolder() {
    document.getElementById('folder-window').style.display = 'none';
}

function fullSizeFolder() {
    const folder = document.getElementById('folder-window');

    if (folder.style.width !== '100%' || folder.style.height !== '100%') {
        // מקסום התיקייה
        folder.style.width = '100%';
        folder.style.height = '100%';
        folder.style.left = '0';
        folder.style.top = '0';
    } else {

        folder.style.width = '50%';
        folder.style.height = '50%';
    }
}







function loadFolderName(folderId) {
    const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
    return foldersData[folderId] ? foldersData[folderId].name : 'Unnamed Folder';
}

const voiceRec = document.getElementById('voiceRec');
if (voiceRec) {
    voiceRec.addEventListener('click', startVoiceRecognition);
}

let trxBtn = document.querySelector("trexBtn");
if (trxBtn) {
    trxBtn.addEventListener("click", startTrexGame())
}



function generateFolderContent(folderName) {
    let content = '';

    if (folderName === 'Documents') {
        content = '<ul><li>File 1</li><li>File 2</li><li>File 3</li></ul>';
    } else if (folderName === 'Music') {
        content = `
            <div class="songsContainer">
                
                <span class="volume-scale">
                    <input type="range" min="0" max="100" value="50" class="volume-slider" id="volumeSlider">
                    <label for="volumeSlider" id="volumeIcon">
                        <i class="fa-solid fa-volume-low"></i>
                    </label>
                </span>
                <h1 dir="rtl">חיפוש שירים ב-iTunes</h1>
                <input type="text" id="searchQuery" placeholder="הקלד שם שיר...">
                <button id="searchButton">חפש</button>
                <button id="voiceRec"><i class="fa-solid fa-microphone"></i></button>
                <div id="results"></div>
            </div>
        `;
    } else if (folderName === 'Projects') {
        for (let i in projectsData.titles) {
            content += `<div class="project-card"><a href=${projectsData.links[i]} target="_blank"><img src=${projectsData.images[i]} alt=${projectsData.titles}></a>
            <h4>${projectsData.titles[i]}</h4>
            </div>`;
        }
    } else if (folderName === 'Games') {
        setTimeout(() => {
            if (document.querySelector('.trexBtn')) {
                document.querySelector('.trexBtn').addEventListener('click', startTrexGame)
            }
        }, 0);
        content += `<button class="trexBtn"><img class='dinoImg' src="dinoImages/standing_still.png"></button>
    <div class="t-rex-game">
        <canvas class="trexCanvas"></canvas>
    </div>`


    } else if (folderName === 'Guitar') {
        for (let i in GuitarData.songData) {
            let imgUrl = GuitarData.songData[i].imgUrl ? GuitarData.songData[i].imgUrl : 'images/defaultArtistImage.jpg';
            content += `
                <div id="songs-container">
                    <div class="song-card" title="${GuitarData.songData[i].artist} - ${GuitarData.songData[i].song}">
                        <span>
                            <a href="${GuitarData.songData[i].chordsUrl}" target="_blank">
                                <img class="songThumbnail" src="${imgUrl}" alt="${GuitarData.songData[i].artist}">
                            </a>
                        </span>
                        <p class="songName">${GuitarData.songData[i].song}</p>
                    </div>
                </div>`;
        }
    }
    else if (folderName === 'VSCode') {

        content = `
        <button id="openCode">open</button>
        `
    }

    return content;
}

