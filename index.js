const electron = require('electron');

const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

function createAddWindow() {
    addWindow = new BrowserWindow({
        title: 'Add New Todo',
        width: 600,
        height: 400,
    });
    addWindow.loadURL(`file://${__dirname}/addTodo.html`);
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add New Todo',
                click() { createAddWindow(); }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({ label: '' });
}