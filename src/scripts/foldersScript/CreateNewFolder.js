import Folder from "./Move&Name.js";

export class NewFolder {
    constructor() {
        this.createFolder(); // הפעלת יצירת תיקייה חדשה
        this.loadFoldersFromLocalStorage(); // טעינת תיקיות מ-LocalStorage לאחר רענון
    }

    createFolder() {
        document.addEventListener('keydown', (e) => {
            if (e.key === '0' && e.ctrlKey) { // יצירת תיקייה חדשה בלחיצה על '0' ו-Ctrl
                this.showFolder();
            }
        });
    }

    addDragAndDrop(folderElement) {
        folderElement.setAttribute('draggable', 'true'); // מאפשר גרירה

        const trashBin = document.getElementById('trash-bin');
        let draggedFolder = null;

        folderElement.addEventListener('dragstart', (e) => {
            draggedFolder = folderElement;
            trashBin.classList.add('active'); // הדגשת פח האשפה בזמן גרירה
        });

        folderElement.addEventListener('dragend', () => {
            draggedFolder = null;
            trashBin.classList.remove('active');
        });

        trashBin.addEventListener('dragover', (e) => {
            e.preventDefault();
            trashBin.classList.add('hover'); // הצגת חיווי בעת גרירה מעל הפח
        });

        trashBin.addEventListener('dragleave', () => {
            trashBin.classList.remove('hover');
        });

        trashBin.addEventListener('drop', () => {
            if (draggedFolder) {
                this.deleteFolder(draggedFolder); // מחיקת התיקייה
                trashBin.classList.remove('hover');
            }
        });
    }

    deleteFolder(folderElement) {
        folderElement.remove();

        // מחיקת התיקייה מ-LocalStorage
        const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
        delete foldersData[folderElement.id];
        localStorage.setItem('foldersData', JSON.stringify(foldersData));
    }

    showFolder() {
        const newFolderElement = document.createElement('div');
        newFolderElement.classList.add('folder');
        newFolderElement.draggable = true;
        newFolderElement.id = `folder${Date.now()}`; // יצירת ID ייחודי

        const input = document.createElement('input');
        input.classList.add('folder-name');
        input.placeholder = 'Name...';
        input.style.color = 'white !important'

        newFolderElement.appendChild(input);
        document.querySelector('.desktop').appendChild(newFolderElement);

        // מיקום התיקייה החדשה
        newFolderElement.style.position = 'absolute';
        newFolderElement.style.left = `100px`; // מיקום ראשוני
        newFolderElement.style.top = '50px'; // מיקום ראשוני

        // אתחול של מחלקת Folder
        const folderInstance = new Folder(newFolderElement);
        this.addDragAndDrop(newFolderElement); // הוספת גרירה לפח

        input.addEventListener('blur', () => {
            const folderName = input.value.trim();
            if (folderName) {
                newFolderElement.dataset.name = folderName;
                folderInstance.saveFolderData(); // שמירת הנתונים ב-LocalStorage
            } else {
                newFolderElement.remove(); // אם לא הוזן שם, התיקייה נמחקת
            }
        });
    }

    loadFoldersFromLocalStorage() {
        const foldersData = JSON.parse(localStorage.getItem('foldersData')) || {};
        Object.keys(foldersData).forEach(folderId => {
            const folderData = foldersData[folderId];
            const folderElement = document.createElement('div');
            folderElement.classList.add('folder');
            folderElement.draggable = true;
            folderElement.id = folderId;
            folderElement.style.position = 'absolute';
            folderElement.style.left = folderData.position.left;
            folderElement.style.top = folderData.position.top;
            folderElement.dataset.name = folderData.name;

            const input = document.createElement('input');
            input.classList.add('folder-name');
            input.value = folderData.name;

            folderElement.appendChild(input);
            document.querySelector('.desktop').appendChild(folderElement);

            const folderInstance = new Folder(folderElement);
            this.addDragAndDrop(folderElement); // הוספת גרירה לפח
        });
    }
}

// אתחול מחלקת NewFolder
new NewFolder();
