const upgradeSound = new Audio('./assets/sounds/upgrade.mp3');
const popSound = new Audio('./assets/sounds/pop.mp3');
const pingSound = new Audio('./assets/sounds/ping.mp3');

function playSound(audio){
    //set volume
    let clone = audio.cloneNode(true);
    clone.volume = 0.1;
    clone.play();
}

function playSoundVolume(audio, volume){
    //set volume
    let clone = audio.cloneNode(true);
    clone.volume = volume;
    clone.play();
}