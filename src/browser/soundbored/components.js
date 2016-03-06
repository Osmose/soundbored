import classNames from 'classnames';
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

import {Sound} from 'soundbored/audio';
import {KEYS, ROWS} from 'soundbored/config';


export class App extends Component {
    constructor(props) {
        super(props);

        let state = {};
        for (let key of KEYS) {
            state[key] = null;
        }

        this.state = state;
    }

    render() {
        return (
            <ul className="board">
                {ROWS.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((key) => (
                            <BoardButton
                                key={key}
                                boardKey={key}
                                sound={this.state[key]}
                                onDrop={::this.handleDrop}
                            />
                        ))}
                    </div>
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


export class BoardButton extends Component {
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
                    <div className="key">{this.props.boardKey}</div>
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
