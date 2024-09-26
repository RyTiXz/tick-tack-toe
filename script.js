
const Game = (function() {
    let gameBoard = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ];

    // Querry selector
    const divFieldClick = document.querySelectorAll('.field');
    const divGameStart = document.querySelector('.gameStart');
    const divGameReset = document.querySelector('.gameReset');
    const divRoundCount = document.querySelector('#roundCounter')
    const divScoreCountP1 = document.querySelector('#scorePlayer1')
    const divScoreCountP2 = document.querySelector('#scorePlayer2')

    // Event Listener
    divGameStart.addEventListener('click', () => {
        if (roundCount.getRoundCount() < 3) {
            playRound();
        } else {
            console.log('Please start a new game!');
            
        }
    })
  
    divGameReset.addEventListener('click', () => {
        if (roundCount.getRoundCount() < 3) {
            let confirmation = confirm('Are you sure you want to reset the game?')
            if (confirmation === true) {
                resetGame();
            }
        } else {
            resetGame();
        }
    })

    // Function to build game field and check for win condition
    for (const field of divFieldClick) {
        function checkTurnAndSetChoice() {
            do {
                if (!(gameBoard.includes(input))) {
                    alert('already chosen, please choose again or start new round')
                    turnCount.decreaseTurnCount();
                    break
                }
            } while (!(gameBoard.includes(input)))
            const index = gameBoard.indexOf(input)
            if (turnCount.getTurnCount() % 2 !== 0) {
                if (gameBoard.includes(input)) {
                    gameBoard[index] = 'X';
                    field.textContent = 'X';
                    checkForWin();
                    turnCount.increaseTurnCount();
                    checkForGameWinner();
                }
            } else if (turnCount.getTurnCount() % 2 === 0) {
                if (gameBoard.includes(input)) {
                    gameBoard[index] = 'O';
                    field.textContent = 'O';
                    checkForWin();
                    turnCount.increaseTurnCount();
                    checkForGameWinner();
                }
            }
        }


        field.addEventListener('click', (clicked_id) => {
            if (roundCount.getRoundCount() <= 3) {
                if(clicked_id.target.id === 'one') {
                    input = 1;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'two') {
                    input = 2;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'three') {
                    input = 3;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'four') {
                    input = 4;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'five') {
                    input = 5;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'six') {
                    input = 6;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'seven') {
                    input = 7;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'eight') {
                    input = 8;
                    checkTurnAndSetChoice();
                }
                if(clicked_id.target.id === 'nine') {
                    input = 9;
                    checkTurnAndSetChoice();
                }
            } else {
                alert('Please reset game via button')
            }
        })
    }

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

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

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
        const decreaseTurnCount = () => turnCount--;
        const resetTurnCount = () => turnCount = 1;

        return {
            getTurnCount,
            increaseTurnCount,
            resetTurnCount,
            decreaseTurnCount
        }
    }

    const turnCount = newTurn();

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
        updateGameScore();
        makeButtonHide();
        enableGameField();
        for (const field of divFieldClick) {
            field.textContent = '';
        }
    }

    // Function to update Game Scores
    function updateGameScore() {
        divRoundCount.textContent = roundCount.getRoundCount();
        divScoreCountP1.textContent = player1.getGameScore();
        divScoreCountP2.textContent = player2.getGameScore();
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
                updateGameScore();
                makeButtonVisible();
                console.log(player1.name + ' wins round ' + roundCount.getRoundCount() + '! He has now a gamescore of: ' + player1.getGameScore());
                disableGameField()
                return true;
            } else if (gameBoard[combination[0]] === 'O' &&
                gameBoard[combination[1]] === 'O' &&
                gameBoard[combination[2]] === 'O') {
                player2.increaseGameScore();
                updateGameScore();
                makeButtonVisible();
                console.log(player2.name + ' wins round ' + roundCount.getRoundCount() + '! He has now a gamescore of: ' + player2.getGameScore());
                disableGameField()
                return true;
            }
        }
    }

    // Function to check for Game winner after 3 Rounds
    function checkForGameWinner() {
        if (roundCount.getRoundCount() === 4) {
            if (player1.getGameScore() > player2.getGameScore()) {
                console.log('Game Winner: ' + player1.name);
            } else if (player1.getGameScore() < player2.getGameScore()) {
                console.log('Game Winner: ' + player2.name);
            } else {
                console.log('Game ended in a tie!')
            }
        }
    }

    // Function to start new round
    function playRound() {
        gameBoard = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ];
        roundCount.increaseRoundCount();
        turnCount.resetTurnCount();
        updateGameScore();
        enableGameField();
        for (const field of divFieldClick) {
            field.textContent = '';
        }
    }

    // Function to disable gameFiel after round is over
    function disableGameField() {
        divFieldClick.forEach(divFieldClick => {
            divFieldClick.classList.add('disabled');
        })
    }

    // Function to enable gameField after new round is started
    function enableGameField() {
        divFieldClick.forEach(divFieldClick => {
            divFieldClick.classList.remove('disabled');
        })
    }

    // Function to only show 'start round' button after round 1
    function makeButtonVisible() {
        divGameStart.style.visibility = 'visible';
    }

    // Function to hide button when game gets resettet
    function makeButtonHide() {
        divGameStart.style.visibility = 'hidden';    
    }

})();

/* 
TO DO:
MANDATORY
- Round 4 is shown after 3 rounds played
- Build ingame display to show winner
- Style game
OPTIONAL
- refractor click eventListener Code

DONE
- build better function for check win function (don't repeat!)
- restart playTurn() not working correctly for now
- playRound() giving two winner alerts, but Tie working correctly
- update of roundCound on website not working correct
- Clicking a already chosen field does increase round count!!
- Clicking a already chosen field does increase playerScore count after game is finished!!
- Clicking an empty field does increase playerScore count after game is finished!!
- Add 'are you sure?' question when clicking reset button while roundCount() is < 3

*/

