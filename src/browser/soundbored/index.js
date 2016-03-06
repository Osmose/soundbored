import keymaster from 'keymaster';
import React from 'react';
import ReactDOM from 'react-dom';

import {App} from 'soundbored/components';
import {KEYS} from 'soundbored/config';


export function start() {
    let app = ReactDOM.render(
        <App />,
        document.querySelector('#app')
    );

    for (let key of KEYS) {
        keymaster(key, function() {
            if (app.state[key] !== null) {
                app.state[key].play();
            }
        });
    }
}
