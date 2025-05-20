const pi =
  "14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679" +
  "82148086513282306647093844609550582231725359408128" +
  "41117450284102701938521105559644622948954930381964" +
  "42881097566593344612847564823378678316527120190914" +
  "56485669234603486104543266482133936072602491412737" +
  "24587006606315588174881520920962829254091715364367" +
  "89259036001133053054882046652138414695194151160943" +
  "30572703657595919530921861173819326117931051185480" +
  "74462379962749567351885752724891227938183011949129" +
  "83367336244065664308602139494639522473719070217986" +
  "09437027705392171762931767523846748184676694051320" +
  "00568127145263560827785771342757789609173637178721" +
  "46844090122495343014654958537105079227968925892354" +
  "20199561121290219608640344181598136297747713099605" +
  "18707211349999983729780499510597317328160963185950" +
  "24459455346908302642522308253344685035261931188171" +
  "01000313783875288658753320838142061717766914730359" +
  "82534904287554687311595628638823537875937519577818" +
  "577805321712268066130019278766111959092164201989";

const maxDigits = pi.length; // Show as many boxes as pi digits
let currentIndex = 0;
let lives = 5;

function updateLivesDisplay() {
    document.getElementById('lives').textContent = `Lives: ${lives}`;
}

function updateMemorizedCount() {
    document.getElementById("memorized-count").textContent = `Digits Memorized: ${currentIndex}`;
}

function initializeGrid() {
    const grid = document.getElementById("digit-grid");
    grid.innerHTML = "";
    for (let i = 0; i < maxDigits; i++) {
        const box = document.createElement("div");
        box.className = "digit-box";
        box.id = `digit-${i}`;
        box.textContent = ""; // Initially blank
        grid.appendChild(box);
    }
}

function checkInput() {
    const input = document.getElementById('input').value;

    if (lives <= 0 || input === "") return;

    if (input === pi[currentIndex]) {
        fillDigit(currentIndex, pi[currentIndex], "black");
        currentIndex++;
        updateMemorizedCount();
        document.getElementById('feedback').textContent = "Correct!";
        document.getElementById('input').value = "";

        // 🎉 Check if all digits are complete
        if (currentIndex === pi.length) {
            document.getElementById('feedback').textContent =
                "🎉 Congratulations! You memorized all 300 digits of Pi!";
            document.getElementById('input').disabled = true;
        }
    } else {
        lives--;
        if (lives > 0) {
            document.getElementById('feedback').textContent = `Incorrect.`;
        } else {
            document.getElementById('feedback').textContent =
                "Game Over! Here's the full pi string:";
            revealPiWithColors();
            document.getElementById('input').disabled = true;
        }
    }

    updateLivesDisplay();
}

function fillDigit(index, value, color = "black") {
    const box = document.getElementById(`digit-${index}`);
    if (box) {
        box.textContent = value;
        box.style.color = color;
    }
}

function revealPiWithColors() {
    for (let i = 0; i < maxDigits; i++) {
        const color = i < currentIndex ? "green" : "red";
        fillDigit(i, pi[i], color);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGrid();
    updateLivesDisplay();
    updateMemorizedCount();

    const inputBox = document.getElementById("input");
    inputBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkInput();
        }
    });
});

function resetGame() {
    currentIndex = 0;
    lives = 5;
    initializeGrid();
    document.getElementById('input').value = "";
    document.getElementById('input').disabled = false;
    document.getElementById('feedback').textContent = "";
    updateLivesDisplay();
    updateMemorizedCount();
}
