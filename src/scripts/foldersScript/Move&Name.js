export default class Folder {
    constructor(element) {
        this.element = element;
        this.nameInput = this.element.querySelector('.folder-name');
        this.name = this.element.getAttribute('data-name');
        this.id = this.element.id;
        this.editAble = true;

        const savedData = JSON.parse(localStorage.getItem('foldersData')) || {};
        const folderData = savedData[this.id];

        if (folderData) {
            this.element.style.left = `${folderData.position?.left || 0}px`;
            this.element.style.top = `${folderData.position?.top || 0}px`;
            this.nameInput.value = folderData.name || this.name;
            this.element.setAttribute('data-name', folderData.name || this.name);
        }

        this.init();
    }

    init() {
        const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
        if (foldersData[this.id]) {
            const { name, position } = foldersData[this.id];
            this.element.style.left = `${position?.left || 0}px`;
            this.element.style.top = `${position?.top || 0}px`;
            this.nameInput.value = name || 'Untitled';
        }

        this.element.addEventListener('mousedown', this.dragStart.bind(this));
        this.nameInput.addEventListener('input', this.saveName.bind(this));
        this.element.ondragstart = () => false;
    }

    /* createFolder() {
        document.addEventListener('keydown', (e) => {
            if (e.key === '0' && e.ctrlKey) { // יצירת תיקייה חדשה בלחיצה על '0' ו-Ctrl
                this.showFolder();
            }
        });
    } */

    saveFolderData() {
        const folderData = JSON.parse(localStorage.getItem('foldersData')) || {};
        const folderId = this.element.id;

        folderData[folderId] = {
            name: this.name,
            position: {
                left: this.element.offsetLeft,
                top: this.element.offsetTop,
            },
        };
        localStorage.setItem('foldersData', JSON.stringify(folderData));
    }

    dragStart(event) {
        this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

        this.moveAt(event.pageX, event.pageY);

        this.onMouseMove = this.onMouseMove.bind(this);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.dragEnd.bind(this));
        document.addEventListener('mouseleave', this.dragEnd.bind(this));
    }

    onMouseMove(event) {
        this.moveAt(event.pageX, event.pageY);
    }

    moveAt(pageX, pageY) {
        let newLeft = pageX - this.shiftX;
        let newTop = pageY - this.shiftY;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const folderWidth = this.element.offsetWidth;
        const folderHeight = this.element.offsetHeight;

        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + folderWidth > screenWidth) newLeft = screenWidth - folderWidth;
        if (newTop + folderHeight > screenHeight) newTop = screenHeight - folderHeight;

        // Check overlaping folder
        const overlappingFolder = Array.from(document.querySelectorAll('.folder')).find(otherFolder => {
            if (otherFolder === this.element) return false; // ignore this folder

            const otherRect = otherFolder.getBoundingClientRect();
            return (
                newLeft < otherRect.right &&
                newLeft + folderWidth > otherRect.left &&
                newTop < otherRect.bottom &&
                newTop + folderHeight > otherRect.top
            );
        });

        // if overlap dont save the new location of the folder
        if (!overlappingFolder) {
            this.element.style.left = `${newLeft}px`;
            this.element.style.top = `${newTop}px`;
        }
    }

    dragEnd() {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.dragEnd.bind(this));
        document.removeEventListener('mouseleave', this.dragEnd.bind(this));


        const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
        foldersData[this.id] = {
            ...foldersData[this.id],
            position: { left: this.element.offsetLeft, top: this.element.offsetTop },
        };
        localStorage.setItem('foldersData', JSON.stringify(foldersData));

    }





    saveName() {
        const folderId = this.element.id;
        const folderName = this.nameInput.value;

        if (['Documents', 'Music', 'Projects', 'Games'].includes(this.name)) {
            this.editAble = false;
        } else {
            this.editAble = true;
        }

        if (this.editAble) {
            this.element.dataset.name = folderName;
            const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
            foldersData[folderId] = {
                ...foldersData[folderId],
                name: folderName,
            };
            localStorage.setItem('foldersData', JSON.stringify(foldersData));
        }
    }


    getFolderName() {
        const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
        return foldersData[this.id]?.name || '...';
    }
}

// init of all the folders
document.querySelectorAll('.folder').forEach(folderElement => {
    new Folder(folderElement);
});








// default settings of the folders
if (localStorage.getItem('foldersData') == null) {
    const foldersData = {
        folder1: { position: { left: 1.5, top: 0 }, name: "Documents" },
        folder2: { position: { left: 0, top: 156 }, name: "Projects" },
        folder3: { position: { left: 0, top: 81 }, name: "Music" },
        folder4: { position: { left: 0, top: 231 }, name: "Games" },
        folder5: { position: { left: 0, top: 315 }, name: "Guitar" },
        folder6: { position: { left: 0, top: 400 }, name: "VSCode" },
    };
    localStorage.setItem('foldersData', JSON.stringify(foldersData));
    setTimeout(() => {
        location.reload();
    }, 800);
}
