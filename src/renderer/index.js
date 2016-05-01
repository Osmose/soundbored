import fs from 'fs';

import electron from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './components';

const ipcRenderer = electron.ipcRenderer;


let app = ReactDOM.render(
    <App />,
    document.querySelector('#app-container')
);


ipcRenderer.on('openPreset', function(event, path) {
    try {
        let preset = JSON.parse(fs.readFileSync(path, 'utf8'));
        app.loadSerializedState(preset);
    } catch (err) {
        alert('Failed to open file.');
    }
});


ipcRenderer.on('savePresetAs', function(event, path) {
    try {
        fs.writeFileSync(path, JSON.stringify(app.serializeState()), {
            encoding: 'utf8'
        });
    } catch (err) {
        alert('Failed to save file.');
    }
});
