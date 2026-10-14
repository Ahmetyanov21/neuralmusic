const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow(){
    const win = new BrowserWindow({
        width: 1040,
        height: 880,
        minWidth: 480,
        minHeight: 700,
        backgroundColor: '#05040a',
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    Menu.setApplicationMenu(null);
    win.loadFile(path.join(__dirname, 'web', 'index.html'));

    win.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12'){
            win.webContents.toggleDevTools();
        }
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
