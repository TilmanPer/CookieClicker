const upgradeSound = new Audio('./assets/sounds/upgrade.mp3');
const popSound = new Audio('./assets/sounds/pop.mp3');
const pingSound = new Audio('./assets/sounds/ping.mp3');

let muted = true;

function playSound(audio) {
    //set volume
    let clone = audio.cloneNode(true);
    clone.volume = muted ? 0 : 0.1;
    clone.play();
}

function playSoundVolume(audio, volume) {
    //set volume
    let clone = audio.cloneNode(true);
    clone.volume = muted ? 0 : volume;
    clone.play();
}

function muteSound() {
    muted = true;
}

function unmuteSound() {
    muted = false;
}

window.onblur = function () {
    muted = true;
    window.onfocus = function () {
        muted = false;
    }
}


//check for any type of interaction to enable sound
window.addEventListener('click', unmuteSound);