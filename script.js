document.addEventListener("DOMContentLoaded", () => {
    initiateGame();
});

function saveProgressToLocalStorage() {
    localStorage.setItem("cookies", cookies);
    for (let stat in statvariables) {
        localStorage.setItem(stat, statvariables[stat]);
    };

    for (let cost in costvariables) {
        localStorage.setItem(cost, costvariables[cost]);
    };
}

function loadProgressFromLocalStorage() {
    cookies = parseInt(localStorage.getItem("cookies") ? localStorage.getItem("cookies") : cookies);
    console.log("cookies: " + cookies);

    for (let stat in statvariables) {
        console.log(stat, statvariables[stat]);
        if (localStorage.getItem(stat) === null) {
            localStorage.setItem(stat, statvariables[stat]);
        }

        statvariables[stat] = parseFloat(localStorage.getItem(stat) ? localStorage.getItem(stat) : statvariables[stat]);

    };

    for (let cost in costvariables) {
        console.log(cost, costvariables[cost]);
        if (localStorage.getItem(cost) === null) {
            localStorage.setItem(cost, costvariables[cost]);
        }

        costvariables[cost] = parseFloat(localStorage.getItem(cost) ? localStorage.getItem(cost) : costvariables[cost]);
    };
}


function initiateGame() {
    loadProgressFromLocalStorage();
    updateShop();
    if (statvariables.autoClickerAmount > 0) {
        handleAutoClicker();
    }
    setInterval(() => {
        pointsPerSecond.innerText = `Cookies/s: ${convertNumber(calculatePointsPerInterval())}`;
    }, 1000);

}

document.onkeydown = (e => {
    if (e.key === 'r') {
        resetProgress();
    }
});

function resetProgress() {
    if (confirm("Are you sure you want to reset your progress?")) {
        localStorage.clear();
        location.reload();
    }
}
