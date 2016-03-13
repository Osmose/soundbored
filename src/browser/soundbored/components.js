import classNames from 'classnames';
import Immutable from 'immutable';
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

import {Sound} from 'soundbored/audio';
import {KEYS, ROWS} from 'soundbored/config';


export class App extends Component {
    constructor(props) {
        super(props);

        let keys = {};
        for (let key of KEYS) {
            keys[key] = null;
        }

        this.state = {
            keys: new Immutable.Map(keys)
        };
    }

    serializeState() {
        let serialized = {keys: {}};

        // Save sounds
        for (let key of KEYS) {
            let sound = this.state[key];
            if (sound) {
                serialized.keys[key] = sound.path;
            }
        }

        return serialized;
    }

    loadSerializedState(serialized) {
        let newState = {keys: new Immutable.Map()};

        for (let key of KEYS) {
            if (key in serialized) {
                newState.keys.set(key, new Sound(serialized.keys[key]));
            } else {
                newState.keys.set(key, null);
            }
        }

        this.setState(newState);
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
                                sound={this.state.keys.get(key)}
                                onDrop={::this.handleDrop}
                            />
                        ))}
                    </div>
                ))}
            </ul>
        );
    }

    handleDrop(key, files) {
        this.setState({
            keys: this.state.keys.set(key, new Sound(files[0].path))
        });
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
