export const defaultText = [
    'function helloWorld() {',
    '\tconsole.log("Hello, World!");',
    '}',
    '',
    'helloWorld();',
    '',
    'let developer = "David Polak";'
];



export const aboutText = [
    '// About the Project:',
    '// This project uses Monaco Editor to display code in the browser,',
    '// featuring a file management system, full-screen mode,',
    '// Spotify integration, and a section for displaying project information (About section).',

    '',

    '// 1. Initializing Monaco Editor:',
    'require.config({ paths: { "vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs" } });',
    'require(["vs/editor/editor.main"], function () {',
    '\tvar editor = monaco.editor.create(document.getElementById("editor"), {',
    '\t\tvalue: defaultText.join("\\n"),',
    '\t\tlanguage: "javascript",',
    '\t\ttheme: "vs-dark",',
    '\t\tautomaticLayout: true',
    '\t});',
    '});',

    '',

    '// 2. Opening and Closing the Code Window:',
    'export function openCodeFunc() {',
    '\tif (openCode) {',
    '\t\tcodeContainer.classList.remove("show");',
    '\t\tcodeContainer.classList.add("hidden");',
    '\t\topenCode = false;',
    '\t} else {',
    '\t\tcodeContainer.classList.remove("hidden");',
    '\t\tcodeContainer.classList.add("show");',
    '\t\topenCode = true;',
    '\t}',
    '}',

    '',

    '// 3. Full-Screen Mode:',
    'function extendFunc() {',
    '\tif (fullScreen) {',
    '\t\tcodeContainer.classList.remove("fullScreen");',
    '\t\tfullScreen = false;',
    '\t} else {',
    '\t\tcodeContainer.classList.add("fullScreen");',
    '\t\tfullScreen = true;',
    '\t}',
    '}',

    '',

    '// 4. File Navigation and Displaying the About Section:',
    '// New navigation feature added to switch between the "Files" section and the "About" section.',
    'function showFilesFunc() {',
    '\tif (flag) {',
    '\t\tfilesNav.style.width = "0px";',
    '\t\tshowFiles.classList.remove("navLinkActive");',
    '\t\tflag = false;',
    '\t} else {',
    '\t\tflag = true;',
    '\t\tfilesNav.style.width = "150px";',
    '\t\tshowFiles.classList.add("navLinkActive");',
    '\t}',
    '}',
    '',
    'function showAboutFunc() {',
    '\taboutFlag = !aboutFlag;',
    '\taboutBtn.classList.toggle("navLinkActive", aboutFlag);',
    '\tshowFiles.classList.remove("navLinkActive");',
    '',
    '\t// Update the editor with the About content or the default code depending on the section.',
    '\tif (editor) {',
    '\t\teditor.setValue(aboutFlag ? aboutText.join("\\n") : defaultText.join("\\n"));',
    '\t} else {',
    '\t\tconsole.warn("Monaco Editor not loaded yet!");',
    '\t}',
    '}',

    '',

    '// 5. Spotify Integration:',
    '// This feature allows users to interact with Spotify directly from the editor interface.',
    'export function displaySpotify() {',
    '\tspotifyContainer.style.visibility = "visible";',
    '\tspotifyContainer.style.opacity = "1";',
    '}',

    '',

    '// Project Developer:',
    'let developer = "David Polak";',
    '"This project was created by David Polak, showcasing Monaco Editor, file navigation, and integration with Spotify."'
];
