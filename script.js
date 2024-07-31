const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const aiToggleButton = document.getElementById('ai-toggle');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isAIEnabled = false;

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
aiToggleButton.addEventListener('click', toggleAI);

function handleClick(e) {
    const index = e.target.dataset.index;
    if (!board[index]) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
            resetGame();
        } else if (board.every(cell => cell)) {
            setTimeout(() => alert(`It's a draw!`), 100);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isAIEnabled && currentPlayer === 'O') {
                makeAIMove();
            }
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function toggleAI() {
    isAIEnabled = !isAIEnabled;
    aiToggleButton.textContent = isAIEnabled ? 'Disable AI' : 'Enable AI';
    resetGame();
}

function makeAIMove() {
    let emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;
    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        resetGame();
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert(`It's a draw!`), 100);
        resetGame();
    } else {
        currentPlayer = 'X';
    }
}