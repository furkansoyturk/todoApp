const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

function createAddWindow() {
    addWindow = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
        title: 'Add New Todo',
        width: 600,
        height: 400,
    });
    addWindow.loadURL(`file://${__dirname}/addTodo.html`);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:app', todo);
    addWindow.close();

});

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

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Developer Console',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(index, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]

    });

}