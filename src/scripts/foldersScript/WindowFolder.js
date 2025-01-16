export default class DraggableFolder {
    constructor(element) {
        this.element = element;
        this.dragging = false;
        this.id = this.element.id;

        this.init();
    }

    init() {
        const header = this.element.querySelector('.folder-header');
        header.addEventListener('mousedown', this.dragStart.bind(this));
        document.addEventListener('mouseup', this.dragEnd.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        this.element.addEventListener('click', this.bringToFront.bind(this));
        window.addEventListener('resize', this.centerFolder.bind(this));

        this.loadPosition();
    }

    dragStart(event) {
        this.dragging = true;
        this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.element.getBoundingClientRect().top;
    }

    drag(event) {
        if (!this.dragging) return;

        let newLeft = event.clientX - this.shiftX;
        let newTop = event.clientY - this.shiftY;

        const folderWidth = this.element.offsetWidth;
        const folderHeight = this.element.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // for overlap
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + folderWidth > screenWidth) newLeft = screenWidth - folderWidth;
        if (newTop + folderHeight > screenHeight) newTop = screenHeight - folderHeight;

        this.element.style.left = `${newLeft}px`;
        this.element.style.top = `${newTop}px`;
    }

    dragEnd() {
        this.dragging = false;
        this.savePosition();
    }

    savePosition() {
        const folderData = JSON.parse(localStorage.getItem('folderPositions')) || {};
        folderData[this.id] = {
            left: this.element.style.left,
            top: this.element.style.top
        };
        localStorage.setItem('folderPositions', JSON.stringify(folderData));
    }

    loadPosition() {
        const folderData = JSON.parse(localStorage.getItem('folderPositions')) || {};
        if (folderData[this.id]) {
            this.element.style.left = folderData[this.id].left;
            this.element.style.top = folderData[this.id].top;
        } else {
            this.centerFolder();  //  if no position found center the folder
        }
    }

    bringToFront() {
        //  reset the z-index for all the other folders
        this.resetZIndexes();

        // high z-index for the chosen folder
        this.element.style.zIndex = '9999';
    }

    resetZIndexes() {
        // reset all folders and VSCode to default z-index
        const folders = document.querySelectorAll('.folder-window, #VSCode');
        folders.forEach(folder => {
            folder.style.zIndex = '10';  // Default for all folders
        });
    }

    centerFolder() {
        const folderWidth = this.element.offsetWidth;
        const folderHeight = this.element.offsetHeight;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const centerLeft = (screenWidth - folderWidth) / 2;
        const centerTop = (screenHeight - folderHeight) / 2;

        this.element.style.left = `${centerLeft}px`;
        this.element.style.top = `${centerTop}px`;
    }
};




// init settings
document.addEventListener('DOMContentLoaded', () => {
    const folder = document.getElementById('folder-window');
    new DraggableFolder(folder);


    const vsCodeSection = document.getElementById('VSCode');
    vsCodeSection.addEventListener('click', () => {
        vsCodeSection.style.zIndex = '9999';  // to make it work on the VSCode folder

        // reset z-index for other folders
        spotifyContainer.style.zIndex = '1';
        const folders = document.querySelectorAll('.folder-window');
        folders.forEach(folder => {
            folder.style.zIndex = '1';
        });
    });

    const spotifyContainer = document.getElementById('spotifyContainer');
    spotifyContainer.addEventListener('click', () => {
        spotifyContainer.style.zIndex = '9999';  // to make it work on the spotify folder

        // reset z-index for other folders
        vsCodeSection.style.zIndex = '1';
        const folders = document.querySelectorAll('.folder-window');
        folders.forEach(folder => {
            folder.style.zIndex = '1';
        });
    });
});
