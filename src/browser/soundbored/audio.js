export class Sound {
    constructor(path) {
        this.audio = document.createElement('audio');
        this.audio.src = `file://${path}`;
    }

    play() {
        this.audio.play();
    }
}
