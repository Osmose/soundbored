/**
 * Application entry point.
 *
 * Since Babel isn't set up yet, this file can't use ES2015 stuff.
 */
const electron = require('electron');

const app = electron.app;
const dialog = electron.dialog;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;


var mainWindow = null;


// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'Soundbored',
            submenu: [
                {
                    label: 'Reload Window',
                    accelerator: 'Command+R',
                    click: function() {
                        mainWindow.reload();
                    }
                },
                {
                    label: 'Open DevTools',
                    accelerator: 'Command+K',
                    click: function() {
                        mainWindow.openDevTools({detach: true});
                    }
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Preset...',
                    accelerator: 'Command+O',
                    click: function() {
                        var paths = dialog.showOpenDialog({
                            title: 'Open Preset',
                            properties: ['openFile']
                        });

                        if (!paths) {
                            return;
                        }

                        mainWindow.webContents.send('openPreset', paths[0]);
                    }
                },
                {
                    label: 'Save Preset As...',
                    accelerator: 'Command+S',
                    click: function() {
                        var path = dialog.showSaveDialog({
                            title: 'Save Preset',
                            properties: ['openFile']
                        });

                        if (!path) {
                            return;
                        }

                        mainWindow.webContents.send('savePresetAs', path);
                    }
                }
            ]
        }
    ]));

    mainWindow.loadURL(`file://${__dirname}/../static/index.html`);

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
