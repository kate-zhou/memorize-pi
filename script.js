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
let startIndex = 0;

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

  // Show all digits before the selected starting point (grayed out)
  for (let i = 0; i < startIndex; i++) {
    const box = document.createElement("div");
    box.className = "digit-box";
    box.textContent = pi[i];
    box.style.color = "#ccc"; // Light gray
    grid.appendChild(box);
  }

  // Show blank boxes for the digits to be guessed
  for (let i = startIndex; i < pi.length; i++) {
    const box = document.createElement("div");
    box.className = "digit-box";
    box.id = `digit-${i}`;
    box.textContent = ""; // Empty for guessing
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

        // 🎉 If reached the end
        if (currentIndex === pi.length) {
            document.getElementById('feedback').textContent =
                "🎉 Congratulations! You memorized all the digits of Pi you started with!";
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
    for (let i = startIndex; i < pi.length; i++) {
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
function setStartingPoint() {
    const inputValue = parseInt(document.getElementById("start-digit").value, 10);
    if (isNaN(inputValue) || inputValue < 1 || inputValue > pi.length) {
        alert("Please enter a valid number between 1 and " + pi.length);
        return;
    }

    startIndex = inputValue - 1; // because user says digit #1, but index is 0-based
    currentIndex = startIndex;
    lives = 5;

    initializeGrid();
    updateLivesDisplay();
    updateMemorizedCount();
    document.getElementById("feedback").textContent = "";
    document.getElementById("input").value = "";
    document.getElementById("input").disabled = false;
}

