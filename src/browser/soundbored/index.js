import fs from 'fs';

import classNames from 'classnames';
import keymaster from 'keymaster';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';


const KEYS = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']


class Sound {
    constructor(path) {
        this.audio = document.createElement('audio');
        this.audio.src = `file://${path}`;
    }

    play() {
        this.audio.play();
    }
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: null,
            w: null,
            e: null,
            a: null,
            s: null,
            d: null,
            z: null,
            x: null,
            c: null
        };
    }

    render() {
        return (
            <ul className="board">
                {KEYS.map((key) => (
                    <BoardButton
                        key={key}
                        boardKey={key}
                        sound={this.state[key]}
                        onDrop={::this.handleDrop}
                    />
                ))}
            </ul>
        );
    }

    handleDrop(key, files) {
        let changes = {};
        changes[key] = new Sound(files[0].path);
        this.setState(changes);
    }
}


class BoardButton extends Component {
    render() {
        return (
            <li
                className={classNames('button', {'assigned': this.props.sound !== null})}
                onClick={::this.handleClick}
            >
                <Dropzone
                    className="dropzone"
                    onDrop={::this.handleDrop}
                    disableClick={true}
                    multiple={false}
                >
                    <span>{this.props.boardKey}</span>
                </Dropzone>
            </li>
        );
    }

    handleClick() {
        if (this.props.sound !== null) {
            this.props.sound.play();
        }
    }

    handleDrop(files) {
        this.props.onDrop(this.props.boardKey, files);
    }
}


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
