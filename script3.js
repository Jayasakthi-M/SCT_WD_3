const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset');
const newGameBtn = document.getElementById('new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const mode2PBtn = document.getElementById('mode-2P');
const modeAIBtn = document.getElementById('mode-AI');

let turnO = true; // Player O starts
let gameMode = ""; // "2P" for 2-player mode, "AI" for playing with the computer
let gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Select game mode
mode2PBtn.addEventListener("click", function () {
    gameMode = "2P";
    resetGame();
});

modeAIBtn.addEventListener("click", function () {
    gameMode = "AI";
    resetGame();
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "Match Drawn!";
        msgContainer.style.display = "block";
        gameOver = true;
        return true;
    }
    return false;
}

function showWinner(winner) {
    msg.innerText = `🎉 Winner: ${winner}!`;
    msgContainer.style.display = "block";
    disableBoxes();
    gameOver = true;
}

function disableBoxes() {
    boxes.forEach(box => box.disabled = true);
}

function enableBoxes() {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    gameOver = false;
}

function resetGame() {
    turnO = true;
    enableBoxes();
    msgContainer.style.display = "none";
    gameOver = false;
}

function aiMove() {
    if (gameOver) return;

    let emptyCells = [...boxes].filter(box => box.innerText === "");
    if (emptyCells.length === 0) return;

    let randomBox = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomBox.innerText = "X";
    randomBox.style.color = "black";
    randomBox.disabled = true;
    
    if (checkWinner()) return;
    turnO = true;
}

boxes.forEach(box => {
    box.addEventListener('click', function () {
        if (gameMode === "") {
            alert("Please select a game mode first!");
            return;
        }
        if (gameOver || this.innerText !== "") return;

        if (turnO) {
            this.innerText = 'O';
            this.style.color = 'green';
        } else {
            this.innerText = 'X';
            this.style.color = 'black';
        }
        this.disabled = true;

        if (checkWinner()) return;

        turnO = !turnO;

        if (gameMode === "AI" && !turnO) {
            setTimeout(aiMove, 500);
        }
    });
});

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);
