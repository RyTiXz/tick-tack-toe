/* Tick tack toe game has: 
- Player
- Gamesscore
- Gamelogic
- Userinput
*/

const Game = (function() {
    let gameBoard = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ];

    // Factory Function to create player and to keep track on gameScore
    function Player(name, marker) {
        let GameScore = 0;
        const getGameScore = () => GameScore;
        const increaseGameScore = () => GameScore++;
        const resetGameScore = () => GameScore = 0;

        return {
            name,
            marker,
            getGameScore,
            increaseGameScore,
            resetGameScore
        };
    }

    const player1 = Player('Flo', 'X');
    const player2 = Player('Tobi', 'O');

    // const player1 = Player(prompt('Insert player 1 name'), 'X');
    // const player2 = Player(prompt('Insert player 2 name'), 'O');

    // Factory Function to create number of played rounds
    function newRound() {
        let roundCount = 1;
        const getRoundCount = () => roundCount;
        const increaseRoundCount = () => roundCount++;
        const resetRoundCount = () => roundCount = 1;

        return {
            getRoundCount,
            increaseRoundCount,
            resetRoundCount
        }
    }

    const roundCount = newRound();

    // Factory Function to create number of played turns
    function newTurn() {
        let turnCount = 1;
        const getTurnCount = () => turnCount;
        const increaseTurnCount = () => turnCount++;
        const resetTurnCount = () => turnCount = 1;

        return {
            getTurnCount,
            increaseTurnCount,
            resetTurnCount
        }
    }

    const turnCount = newTurn();

    // Function to set back Gameboard and RoundCount to initial vlaues
    function initGame() {
        gameBoard = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ];
        turnCount.resetTurnCount();
    }

    // Function to reset complete game
    function resetGame() {
        gameBoard = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ];
        roundCount.resetRoundCount();
        turnCount.resetTurnCount();
        player1.resetGameScore();
        player2.resetGameScore();
    }

    // Function to play one turn
    function playTurn() {
        // Get user input
        let input;
        do {
            input = Number(prompt('choose 1-9'))
            if (isNaN(input) || isNaN('') || input > 9 || input < 1) {
                alert('Wrong input. Please choose a number between 1-9')
            } else if (!(gameBoard.includes(input))) {
                alert('already chosen, please choose again')
            }
        } while (!(gameBoard.includes(input)))

        // Replace user choice in game array
        const index = gameBoard.indexOf(input)
        if (turnCount.getTurnCount() % 2 !== 0) {
            if (gameBoard.includes(input)) {
                gameBoard[index] = 'X';
            }
        } else if (turnCount.getTurnCount() % 2 === 0) {
            if (gameBoard.includes(input)) {
                gameBoard[index] = 'O';
            }
        }
    }

    // Function to check for win
    function checkForWin() {
        const winningCombinations = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            if (gameBoard[combination[0]] === 'X' &&
                gameBoard[combination[1]] === 'X' &&
                gameBoard[combination[2]] === 'X') {
                player1.increaseGameScore();
                console.log(gameBoard);
                console.log(player1.name + ' wins round ' + roundCount.getRoundCount() + '!')
                return true;
            } else if (gameBoard[combination[0]] === 'O' &&
                gameBoard[combination[1]] === 'O' &&
                gameBoard[combination[2]] === 'O') {
                player2.increaseGameScore();
                console.log(gameBoard);
                console.log(player2.name + ' wins round ' + roundCount.getRoundCount() + '!')
                return true;
            }
        }
    }

    function checkForGameWinner() {
        if (player1.getGameScore() > player2.getGameScore()) {
            console.log('Game Winner: ' + player1.name);
        } else if (player1.getGameScore() < player2.getGameScore()) {
            console.log('Game Winner: ' + player2.name);
        } else {
            console.log('Game ended in a tie!')
        }
    }

    // Function to play three rounds
    function playGame() {
        if (roundCount.getRoundCount() <= 3) {
            console.log({
                Round: roundCount.getRoundCount(),
            });
            playAllTurns()
            roundCount.increaseRoundCount();
        } else {
            resetGame();
        }
    }

    // Function to play max. all nine turns or till one wins
    function playAllTurns() {
        while (turnCount.getTurnCount() <= 9) {
            console.log({
                Turn: turnCount.getTurnCount()
            });
            playTurn()
            if (checkForWin() === true) {
                break
            }
            if (turnCount.getTurnCount() === 9) {
                alert('Tie!')
            }
            console.log(gameBoard);
            turnCount.increaseTurnCount();
        }
        console.log({
            Player: player1.name,
            GameScore: player1.getGameScore()
        })
        console.log({
            Player: player2.name,
            GameScore: player2.getGameScore()
        })
        if (roundCount.getRoundCount() == 3) {
            checkForGameWinner();
        } 
        initGame();

    }

    return {
        playGame: playGame,
        initGame: initGame,
        resetGame: resetGame,
        turnCount: turnCount.getTurnCount,
        roundCount: roundCount.getRoundCount,
    }

})();
/* 
TO DO
- work on refactoring spaghetti code. Learn how to do this
- Better understand how to write good functions


DONE
- build better function for check win function (don't repeat!)
- restart playTurn() not working correctly for now
- playGame() giving two winner alerts, but Tie working correctly

*/