import fs from 'fs';

import electron from 'electron';
import keymaster from 'keymaster';
import React from 'react';
import ReactDOM from 'react-dom';

import {App} from 'soundbored/components';
import {KEYS} from 'soundbored/config';

const ipcRenderer = electron.ipcRenderer;


let app = null;


export function start() {
    app = ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );

    for (let key of KEYS) {
        keymaster(key, function() {
            let sound = app.state.keys.get(key);
            if (sound !== null) {
                sound.play();
            }
        });
    }
}


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
