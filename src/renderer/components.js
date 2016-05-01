import classNames from 'classnames';
import Immutable from 'immutable';
import React, {Component} from 'react';
//import Dropzone from 'react-dropzone';

//import {Sound} from 'soundbored/audio';
import {KEYS, ROWS} from './config';


//const MODE_PERFORMANCE = 'performance';
const MODE_EDIT = 'edit';


export class App extends Component {
    constructor(props) {
        super(props);

        let sounds = {};
        for (let key of KEYS) {
            sounds[key] = null;
        }

        this.state = {
            mode: MODE_EDIT,
            editingKey: null,
            sounds: new Immutable.Map(sounds)
        };
    }

    render() {
        let {mode, sounds, editingKey} = this.state;

        return (
            <div className={classNames('app', `mode-${mode}`)}>
                <SoundBoard sounds={sounds} />
                {editingKey !== null
                    ? <BoardButtonEditor key={sounds[editingKey]} />
                    : null}
                <ModeChanger />
            </div>
        );
    }
}


export class ModeChanger extends Component {
    render() {
        return (
            <div className="mode-changer">
                <span>ON-AIR</span>
            </div>
        );
    }
}


export class SoundBoard extends Component {
    render() {
        return (
            <div className="soundboard">
                {ROWS.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((key) => (
                            <BoardButton
                                key={key}
                                soundKey={key}
                                sound={this.props.sounds.get(key)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}


export class BoardButton extends Component {
    render() {
        return (
            <li className="button">
                <div className="key">{this.props.soundKey}</div>
            </li>
        );
    }
}


class BoardButtonEditor extends Component {
    render() {
        let {key, sound} = this.props;

        return (
            <form className="pad-editor">
                <div className="details">
                    <div className="button-container">
                        <BoardButton soundKey={key} sound={sound} />
                    </div>
                    <div className="fields-container">
                        <FileField />
                        <IconField />
                        <ColorField />
                    </div>
                    <div className="volume-container">
                        <VolumeField />
                    </div>
                </div>
                <div className="effects">
                    <EffectEditor effect="Phaser" />
                    <EffectEditor effect="Chorus" />
                    <EffectEditor effect="Reverb" />
                </div>
                <div className="actions">
                    <button className="clear">Clear</button>
                    <button className="done">Done</button>
                </div>
            </form>
        );
    }
}


class FileField extends Component {
    render() {
        return (
            <div className="field">
                <label htmlFor="file">File:</label>
                <input name="file" type="file" />
            </div>
        );
    }
}


class IconField extends Component {
    render() {
        return (
            <div className="field">
                <label htmlFor="icon">Icon:</label>
                <input name="icon" type="file" />
            </div>
        );
    }
}


class ColorField extends Component {
    render() {
        return (
            <div className="field">
                <label htmlFor="color">Color:</label>
                <input name="color" type="color" />
            </div>
        );
    }
}


class VolumeField extends Component {
    render() {
        return (
            <div className="field">
                <label htmlFor="volume">Volume:</label>
                <input name="volume" type="range" />
            </div>
        );
    }
}


class EffectEditor extends Component {
    render() {
        let {effect} = this.props;

        return (
            <div className="effect">
                <label className="toggle" htmlFor={effect}>
                    <input type="checkbox" name={effect} />
                    <span>{effect}</span>
                </label>
                <EffectParameter effect={effect} name="a" />
                <EffectParameter effect={effect} name="b" />
                <EffectParameter effect={effect} name="c" />
                <EffectParameter effect={effect} name="d" />
            </div>
        );
    }
}


class EffectParameter extends Component {
    render() {
        let {effect, name} = this.props;

        return (
            <input name={`${effect}-${name}`} type="number" />
        );
    }
}
