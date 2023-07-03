//elements
const pointsPerClickCostContainer = document.getElementById("pointsPerClickCost");
const clickMultiplierCostContainer = document.getElementById("clickMultiplierCost");
const autoClickerAmountCostContainer = document.getElementById("autoClickerAmountCost");
const autoClickerSpeedCostContainer = document.getElementById("autoClickerSpeedCost");
const autoClickerMultiplierCostContainer = document.getElementById("autoClickerMultiplierCost");
const sweetSpotChanceCostContainer = document.getElementById("sweetSpotChanceCost");
const sweetSpotMultiplierCostContainer = document.getElementById("sweetSpotMultiplierCost");

//upgrade costs
let pointsPerClickCost = 10;
let clickMultiplierCost = 100;
let autoClickerAmountCost = 1000;
let autoClickerSpeedCost = 10000;
let autoClickerMultiplierCost = 10000000;
let sweetSpotChanceCost = 100000;
let sweetSpotMultiplierCost = 1000000;

//upgrade functions
function upgradePointsPerClick() {
    if (canPurchase(pointsPerClickCost)) {
        cookies -= pointsPerClickCost;
        pointsPerClick += 1;
        pointsPerClickCost *= 1.15;
        playSound(upgradeSound);
    }
    updateShop();
}

function upgradeClickMultiplier() {
    if (canPurchase(clickMultiplierCost)) {
        cookies -= clickMultiplierCost;
        clickMultiplier += 0.1;
        clickMultiplierCost *= 1.15;
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeAutoClickerAmount() {
    if (canPurchase(autoClickerAmountCost)) {
        cookies -= autoClickerAmountCost;
        autoClickerAmount += 1;
        autoClickerAmountCost *= 1.15;
        addAutoClicker();
        handleAutoClicker();
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeAutoClickerMultiplier() {
    if (canPurchase(autoClickerMultiplierCost)) {
        cookies -= autoClickerMultiplierCost;
        autoClickerMultiplier += 1;
        autoClickerMultiplierCost *= 1.15;

        handleAutoClicker();
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeAutoClickerSpeed() {
    if (canPurchase(autoClickerSpeedCost)) {
        cookies -= autoClickerSpeedCost;
        autoClickerSpeed += 0.05;
        autoClickerSpeedCost *= 1.15;

        handleAutoClicker();
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeSweetSpotChance() {
    if (canPurchase(sweetSpotChanceCost)) {
        cookies -= sweetSpotChanceCost;
        sweetSpotChance += 1;
        sweetSpotChanceCost *= 1.15;
        playSound(upgradeSound);
    }
    updateShop();
}

function upgradeSweetSpotMultiplier() {
    if (canPurchase(sweetSpotMultiplierCost)) {
        cookies -= sweetSpotMultiplierCost;
        sweetSpotMultiplier += 5;
        sweetSpotMultiplierCost *= 1.15;
        playSound(upgradeSound);
    }
    updateShop();
}


//other functions

function addAutoClicker() {
    const autoClicker = document.createElement("div");
    autoClicker.classList.add("autoClicker");
    autoClicker.classList.add("autoClicker" + autoClickerAmount);
    autoClickerContainer.appendChild(autoClicker);
}

function canPurchase(cost) {
    if (cookies >= cost) {
        return true;
    }
    let activeElement = document.activeElement;
    if (!activeElement.classList.contains("disabled")) {
        activeElement.classList.add("disabled");
        activeElement.classList.add("shake");
        setTimeout(() => {
            activeElement.classList.remove("disabled");
            activeElement.classList.remove("shake");
        }, 300);
    }
    return false;
}


function updateShop() {
    //round up
    pointsPerClickCostContainer.innerText = convertNumber(pointsPerClickCost);
    clickMultiplierCostContainer.innerText = convertNumber(clickMultiplierCost);
    autoClickerAmountCostContainer.innerText = convertNumber(autoClickerAmountCost);
    autoClickerSpeedCostContainer.innerText = convertNumber(autoClickerSpeedCost);
    autoClickerMultiplierCostContainer.innerText = convertNumber(autoClickerMultiplierCost);
    sweetSpotChanceCostContainer.innerText = convertNumber(sweetSpotChanceCost);
    sweetSpotMultiplierCostContainer.innerText = convertNumber(sweetSpotMultiplierCost);
    updateStats();
}