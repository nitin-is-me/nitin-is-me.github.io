let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function makeMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        let square = document.getElementById('board').children[row * 3 + col];
        square.innerText = currentPlayer;
        square.classList.add(currentPlayer === 'X' ? 'x-color' : 'o-color');

        if (checkWin()) {
            let winnerMessage = `Player ${currentPlayer === 'X' ? '1' : '2'} wins!`;
            setTimeout(function() {
                alert(winnerMessage);
                resetGame();
            }, 100);
        } else if (checkDraw()) {
            setTimeout(function() {
                alert("It's a draw!");
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage();
        }
    }
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return true;
        }
    }
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return true;
        }
    }
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
    }
    return false;
}

function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true; 
}

function resetGame() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.innerText = '';
        square.classList.remove('x-color', 'o-color'); 
    });
    updateMessage();
}

function updateMessage() {
    let messageElement = document.getElementById('message');
    if (currentPlayer === 'X') {
        messageElement.innerText = `Player 1's turn (X)`;
        messageElement.classList.remove('alert-danger');
        messageElement.classList.add('alert-primary'); 
    } else {
        messageElement.innerText = `Player 2's turn (O)`;
        messageElement.classList.remove('alert-primary'); 
        messageElement.classList.add('alert-danger'); 
    }
}