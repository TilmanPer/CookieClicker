//elements
const gameField = document.getElementById("gameField");
const pointsPerClickContainer = document.getElementById("pointsPerClick");
const autoClickerContainer = document.getElementById("autoClicker");
const sweetSpotChanceContainer = document.getElementById("sweetSpotChance");
const sweetSpotMultiplierContainer = document.getElementById("sweetSpotMultiplier");
const scoreContainer = document.getElementById("score");
const cookie = document.getElementById("clicker");

let soundInterval;

let cookies = 0;

//variables for upgrades
let pointsPerClick = 1;
let clickMultiplier = 1;
let autoClickerAmount = 0;
let autoClickerSpeed = 1;
let autoClickerMultiplier = 1;
let sweetSpotChance = 1;
let sweetSpotMultiplier = 5;

let truePointsPerClick = pointsPerClick * clickMultiplier;


function updateStats() {
    truePointsPerClick = pointsPerClick * clickMultiplier;

    pointsPerClickContainer.innerText = `Points Per Click: ${pointsPerClick} x${clickMultiplier.toFixed(1)}`;
    autoClickerContainer.innerText = `Auto Clicker: ${(autoClickerAmount * autoClickerMultiplier)}/${((1 / autoClickerSpeed).toFixed(2))}s`;
    sweetSpotChanceContainer.innerText = `Sweet Spot Chance: ${sweetSpotChance}%`;
    sweetSpotMultiplierContainer.innerText = "Sweet Spot Multiplier: " + sweetSpotMultiplier;
    scoreContainer.innerText = convertNumber(cookies);
}

function handleClick() {
    let amount = 0;
    amount += truePointsPerClick;

    //sweet spot
    if (Math.random() * 100 < sweetSpotChance) {
        amount *= sweetSpotMultiplier;
        hitSweetSpot();
    }

    cookies += amount;
    scoreContainer.innerText = convertNumber(cookies);
}

/**
* @param {bool} sound
* @param {bool} sweetSpot
*/
function simulateClick(sound, sweetSpot) {
    let amount = 0;
    amount += truePointsPerClick;

    //sweet spot
    if (sweetSpot) {
        if (Math.random() * 100 < sweetSpotChance) {
            amount *= sweetSpotMultiplier;
            hitSweetSpot();
        }
    }

    cookies += amount;
    scoreContainer.innerText = convertNumber(cookies);
    if (sound) {
        playSoundVolume(popSound, 0.05);
    }
}

function handleAutoClicker() {
    //separated sound to prevent overlapping
    clearInterval(soundInterval);
    soundInterval = setInterval(() => {
        playSoundVolume(popSound, 0.05);
    }, 1000 / autoClickerSpeed);

    for (let i = 0; i < autoClickerAmount * autoClickerMultiplier; i++) {

        if (window[`autoClicker${i}`]) {
            clearInterval(window[`autoClicker${i}`]);
        }

        window[`autoClicker${i}`] = setInterval(() => {
            simulateClick(false, false);
        }, 1000 / autoClickerSpeed);
    }
}

function hitSweetSpot() {
    cookie.classList.add("sweet-spot");
    playSoundVolume(pingSound, 0.005);
    setTimeout(() => {
        cookie.classList.remove("sweet-spot");
    }, 100);
}

function convertNumber(number) {
    let suffixes = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    if (number < 1000000) {
        return number.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
        let suffixIndex = Math.floor(Math.log10(number) / 6);
        let suffix = suffixes[suffixIndex];
        let formattedNumber = (number / Math.pow(10, suffixIndex * 6)).toFixed(2);
        return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + suffix;
    }
}