//elements
const gameField = document.getElementById("gameField");
const pointsPerClickContainer = document.getElementById("pointsPerClick");
const autoClickerContainer = document.getElementById("autoClicker");
const sweetSpotChanceContainer = document.getElementById("sweetSpotChance");
const sweetSpotMultiplierContainer = document.getElementById("sweetSpotMultiplier");
const scoreContainer = document.getElementById("score");
const pointsPerSecond = document.getElementById("pointsPerSecond");
const cookie = document.getElementById("clicker");

let soundInterval;
let simulateClickers;

let cookies = localStorage.getItem("cookies") ? parseInt(localStorage.getItem("cookies")) : 0;

//variables for upgrades
let statvariables = {
    pointsPerClick: 1,
    clickMultiplier: 1,
    autoClickerAmount: 0,
    autoClickerSpeed: 1,
    autoClickerMultiplier: 1,
    sweetSpotChance: 1,
    sweetSpotMultiplier: 5,
};

let truePointsPerClick = statvariables.pointsPerClick * statvariables.clickMultiplier;


function updateStats() {
    truePointsPerClick = statvariables.pointsPerClick * statvariables.clickMultiplier;

    pointsPerClickContainer.innerText = `Cookies Per Click: ${convertNumber(statvariables.pointsPerClick)} x${statvariables.clickMultiplier.toFixed(1)}`;
    autoClickerContainer.innerText = `Auto Clicker: ${convertNumber(statvariables.autoClickerAmount * statvariables.autoClickerMultiplier)}/${((1 / statvariables.autoClickerSpeed).toFixed(2))}s`;
    sweetSpotChanceContainer.innerText = `Sweet Spot Chance: ${convertNumber(statvariables.sweetSpotChance)}%`;
    sweetSpotMultiplierContainer.innerText = "Sweet Spot Multiplier: " + convertNumber(statvariables.sweetSpotMultiplier);
    scoreContainer.innerText = convertNumber(cookies);


    saveProgressToLocalStorage();
}

function handleClick() {
    let amount = 0;
    amount += truePointsPerClick;
    let sweetSpot = false;

    //sweet spot
    if (Math.random() * 100 < statvariables.sweetSpotChance) {
        sweetSpot = true;
        amount *= statvariables.sweetSpotMultiplier;
        hitSweetSpot();
    }

    cookies += amount;
    scoreContainer.innerText = convertNumber(cookies);
    createIncrementPopupAtMousePosition(amount, sweetSpot);

    localStorage.setItem("cookies", cookies);
}

/**
* @param {bool} sound
* @param {bool} sweetSpot
* @param {bool} clickMultiplier
*/
function simulateClick(sound, sweetSpot, clickMultiplier) {
    let amount = 0;
    amount += clickMultiplier ? truePointsPerClick : statvariables.pointsPerClick;

    //sweet spot
    if (sweetSpot) {
        if (Math.random() * 100 < statvariables.sweetSpotChance) {
            amount *= statvariables.sweetSpotMultiplier;
            hitSweetSpot();
        }
    }

    cookies += amount;
    scoreContainer.innerText = convertNumber(cookies);
    localStorage.setItem("cookies", cookies);
    createIncrementPopup(amount * statvariables.autoClickerAmount * statvariables.autoClickerMultiplier, sweetSpot);
    if (sound) {
        playSoundVolume(popSound, 0.05);
    }
}

function handleAutoClicker() {
    //separated sound to prevent overlapping
    clearInterval(soundInterval);
    soundInterval = setInterval(() => {
        playSoundVolume(popSound, 0.05);
    }, 1000 / statvariables.autoClickerSpeed);

    clearInterval(simulateClickers);
    simulateClickers = setInterval(() => {
        cookies += statvariables.pointsPerClick * statvariables.autoClickerAmount * statvariables.autoClickerMultiplier;
        scoreContainer.innerText = convertNumber(cookies);
        localStorage.setItem("cookies", cookies);
        createIncrementPopup(statvariables.pointsPerClick * statvariables.autoClickerAmount * statvariables.autoClickerMultiplier, false);
    }, 1000 / statvariables.autoClickerSpeed);
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

function createIncrementPopup(amount, sweetSpot) {
    let popup = document.createElement("div");
    popup.classList.add("increment-popup");
    //place in cookie random
    popup.style.left = `${cookie.offsetLeft - cookie.offsetWidth / 2 + Math.random() * cookie.offsetWidth}px`;
    popup.style.top = `${cookie.offsetTop - cookie.offsetHeight / 2 + Math.random() * cookie.offsetHeight}px`;
    if (sweetSpot) {
        popup.classList.add("popup-sweet-spot");
    }
    popup.innerText = `+${convertNumber(amount)}`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);
}

function createIncrementPopupAtMousePosition(amount, sweetSpot) {
    let popup = document.createElement("div");
    //get mouse position without event
    let mouseX = window.event.clientX ? window.event.clientX : document.offsetWidth / 2;
    let mouseY = window.event.clientY ? window.event.clientY : document.offsetHeight / 2;

    popup.classList.add("increment-popup");
    popup.innerText = `+${convertNumber(amount)}`;
    popup.style.left = `${mouseX}px`;
    popup.style.top = `${mouseY}px`;
    if (sweetSpot) {
        popup.classList.add("popup-sweet-spot");
    }
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);
}

let perviousCookies = cookies;
function calculatePointsPerInterval() {
    let pointsPerSecond = cookies - perviousCookies;
    perviousCookies = cookies;
    return pointsPerSecond;
}