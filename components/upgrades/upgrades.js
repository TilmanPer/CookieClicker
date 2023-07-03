//elements
const pointsPerClickCostContainer = document.getElementById("pointsPerClickCost");
const clickMultiplierCostContainer = document.getElementById("clickMultiplierCost");
const autoClickerAmountCostContainer = document.getElementById("autoClickerAmountCost");
const autoClickerSpeedCostContainer = document.getElementById("autoClickerSpeedCost");
const autoClickerMultiplierCostContainer = document.getElementById("autoClickerMultiplierCost");
const sweetSpotChanceCostContainer = document.getElementById("sweetSpotChanceCost");
const sweetSpotMultiplierCostContainer = document.getElementById("sweetSpotMultiplierCost");

//upgrade costs
let costvariables = {
    pointsPerClickCost: 10,
    clickMultiplierCost: 100,
    autoClickerAmountCost: 1000,
    autoClickerSpeedCost: 10000,
    autoClickerMultiplierCost: 10000000,
    sweetSpotChanceCost: 100000,
    sweetSpotMultiplierCost: 1000000
};

//upgrade functions
function upgradePointsPerClick() {
    if (canPurchase(costvariables.pointsPerClickCost)) {
        cookies -= costvariables.pointsPerClickCost;
        statvariables.pointsPerClick += 1;
        costvariables.pointsPerClickCost *= 1.15;
        playSound(upgradeSound);
    }
    updateShop();
}

function upgradeClickMultiplier() {
    if (canPurchase(costvariables.clickMultiplierCost)) {
        cookies -= costvariables.clickMultiplierCost;
        statvariables.clickMultiplier += 0.1;
        costvariables.clickMultiplierCost *= 1.15;
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeAutoClickerAmount() {
    if (canPurchase(costvariables.autoClickerAmountCost)) {
        cookies -= costvariables.autoClickerAmountCost;
        statvariables.autoClickerAmount += 1;
        costvariables.autoClickerAmountCost *= 1.15;
        addAutoClicker();
        handleAutoClicker();
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeAutoClickerMultiplier() {
    if (canPurchase(costvariables.autoClickerMultiplierCost)) {
        cookies -= costvariables.autoClickerMultiplierCost;
        statvariables.autoClickerMultiplier += 1;
        costvariables.autoClickerMultiplierCost *= 1.15;

        handleAutoClicker();
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeAutoClickerSpeed() {
    if (canPurchase(costvariables.autoClickerSpeedCost)) {
        cookies -= costvariables.autoClickerSpeedCost;
        statvariables.autoClickerSpeed += 0.05;
        costvariables.autoClickerSpeedCost *= 1.15;

        handleAutoClicker();
        playSound(upgradeSound);
    }

    updateShop();
}

function upgradeSweetSpotChance() {
    if (canPurchase(costvariables.sweetSpotChanceCost)) {
        cookies -= costvariables.sweetSpotChanceCost;
        statvariables.sweetSpotChance += 1;
        costvariables.sweetSpotChanceCost *= 1.15;
        playSound(upgradeSound);
    }
    updateShop();
}

function upgradeSweetSpotMultiplier() {
    if (canPurchase(costvariables.sweetSpotMultiplierCost)) {
        cookies -= costvariables.sweetSpotMultiplierCost;
        statvariables.sweetSpotMultiplier += 5;
        costvariables.sweetSpotMultiplierCost *= 1.15;
        playSound(upgradeSound);
    }
    updateShop();
}

//other functions

function addAutoClicker() {
    
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
    pointsPerClickCostContainer.innerText = convertNumber(costvariables.pointsPerClickCost);
    clickMultiplierCostContainer.innerText = convertNumber(costvariables.clickMultiplierCost);
    autoClickerAmountCostContainer.innerText = convertNumber(costvariables.autoClickerAmountCost);
    autoClickerSpeedCostContainer.innerText = convertNumber(costvariables.autoClickerSpeedCost);
    autoClickerMultiplierCostContainer.innerText = convertNumber(costvariables.autoClickerMultiplierCost);
    sweetSpotChanceCostContainer.innerText = convertNumber(costvariables.sweetSpotChanceCost);
    sweetSpotMultiplierCostContainer.innerText = convertNumber(costvariables.sweetSpotMultiplierCost);
    updateStats();
}