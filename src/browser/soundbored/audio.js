export class Sound {
    constructor(path) {
        this.path = path;
        this.audio = document.createElement('audio');
        this.audio.src = `file://${path}`;
    }

    play() {
        this.audio.currentTime = 0;
        this.audio.play();
    }
}
