/**
 * Application entry point.
 */
import {app, BrowserWindow, dialog, Menu} from 'electron';


let mainWindow = null;


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
                    click() {
                        mainWindow.reload();
                    }
                },
                {
                    label: 'Open DevTools',
                    accelerator: 'Command+K',
                    click() {
                        mainWindow.openDevTools({detach: true});
                    }
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click() {
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
                    click() {
                        let paths = dialog.showOpenDialog({
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
                    click() {
                        let path = dialog.showSaveDialog({
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

    console.log(`file://${__dirname}/../static/index.html`);
    mainWindow.loadURL(`file://${__dirname}/../static/index.html`);

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
