(function() {
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
    const divInfoMonitor = document.querySelector('.infoMonitor')
    const divInstructionButton = document.querySelector('.instruction')

    // Function to build game field and check for win condition
    for (const field of divFieldClick) {
        function checkTurnAndSetChoice() {
            do {
                if (!(gameBoard.includes(input))) {
                    alert('already chosen, please choose again or start new round')
                    break
                }
            } while (!(gameBoard.includes(input)))
            const index = gameBoard.indexOf(input)
            if (turnCount.getTurnCount() % 2 !== 0) {
                if (gameBoard.includes(input)) {
                    gameBoard[index] = 'X';
                    field.textContent = 'X';
                    field.classList.add('P1');
                    removeInfoText();
                    checkForWin();
                    turnCount.increaseTurnCount();
                }
            } else if (turnCount.getTurnCount() % 2 === 0) {
                if (gameBoard.includes(input)) {
                    gameBoard[index] = 'O';
                    field.textContent = 'O';
                    field.classList.add('P2');
                    removeInfoText();
                    checkForWin();
                    turnCount.increaseTurnCount();
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
                divInfoMonitor.textContent = 'Please reset game via button';
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

    // Event listener for new Round
    divGameStart.addEventListener('click', () => {
        if (divGameStart.textContent === 'Result') {
            checkForGameWinner();
        }
        else {
            startNewRound()
        };
    });

    // Function to start new round
    function startNewRound() {
        gameBoard = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ];
        for (const field of divFieldClick) {
            field.textContent = '';
        }
        roundCount.increaseRoundCount();
        showInfoText();
        updateGameScore();
        enableGameField();
        makeStartButtonHide();
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
        if (gameBoard.some(Number)) {
            for (const combination of winningCombinations) {
                if (gameBoard[combination[0]] === 'X' &&
                    gameBoard[combination[1]] === 'X' &&
                    gameBoard[combination[2]] === 'X') {
                        player1.increaseGameScore();
                        updateGameScore();
                        makeButtonVisible();
                        disableGameField();
                        if (player1.getGameScore() > 1) {
                            divGameStart.textContent = 'Result';
                        }
                        divInfoMonitor.textContent = `${player1.name} wins round ${roundCount.getRoundCount()}!`;
                } else if (gameBoard[combination[0]] === 'O' &&
                    gameBoard[combination[1]] === 'O' &&
                    gameBoard[combination[2]] === 'O') {
                        player2.increaseGameScore();
                        updateGameScore();
                        makeButtonVisible();
                        disableGameField();
                        if (player2.getGameScore() > 1) {
                            divGameStart.textContent = 'Result';
                        }
                        divInfoMonitor.textContent = `${player2.name} wins round ${roundCount.getRoundCount()}!`;
                }
            }
        } else if (!(gameBoard.some(Number))) {
            divInfoMonitor.textContent = 'Tie!';
            makeButtonVisible();
            disableGameField()
            if (roundCount.getRoundCount() === 3) {
                divGameStart.textContent = 'Result';
            }
        }
    }

    // Function to check for Game winner after 3 Rounds
    function checkForGameWinner() {
            if (player1.getGameScore() > player2.getGameScore()) {
                divInfoMonitor.textContent = `Game Winner: ${player1.name}`;
                divGameReset.style.border = 'solid red 3px';
                disableGameField();
                makeStartButtonHide();
            } else if (player1.getGameScore() < player2.getGameScore()) {
                divInfoMonitor.textContent = `Game Winner: ${player2.name}`;
                divGameReset.style.border = 'solid red 3px';
                disableGameField();
                makeStartButtonHide();
            } else {
                divInfoMonitor.textContent = 'Game ended in a tie!';
                divGameReset.style.border = 'solid red 3px';
                disableGameField();
                makeStartButtonHide();
            }
    }

    // Function to update Game Scores
    function updateGameScore() {
        divRoundCount.textContent = roundCount.getRoundCount();
        divScoreCountP1.textContent = player1.getGameScore();
        divScoreCountP2.textContent = player2.getGameScore();
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
            divFieldClick.classList.remove('disabled', 'P1', 'P2');
        })
    }

    // Function to only show 'new round' and 'reset game' button after round 1
    function makeButtonVisible() {
        divGameStart.style.pointerEvents = 'all';
        divGameStart.style.opacity = '1';
        divGameReset.style.pointerEvents = 'all';
        divGameReset.style.opacity = '1';
        divGameStart.style.border = 'solid red 3px';
        divGameStart.textContent = 'New Round';
    }

    // Function to hide button when game gets reset
    function makeStartButtonHide() {
        divGameStart.style.pointerEvents = 'none';
        divGameStart.style.opacity = '0.5';  
        divGameStart.style.border = 'none';
        divGameStart.textContent = 'New Round';
    }

    // Functions to show or remove info text from info monitor
    function removeInfoText() {
        divInfoMonitor.textContent = '';
    }

    function showInfoText() {
        if (turnCount.getTurnCount() % 2 !== 0) {
            divInfoMonitor.textContent = 'Player 1 beginns!'
        } else if (turnCount.getTurnCount() % 2 === 0) {
            divInfoMonitor.textContent = 'Player 2 beginns!'
        }
    }

    // Event Listener to show instructions
    divInstructionButton.addEventListener('click', () => {
        let popup = document.querySelector("#instructionFunctionID");
        popup.classList.toggle("show");
    })

    // Event listener to reset game
    divGameReset.addEventListener('click', () => {
        if (roundCount.getRoundCount() < 3) {
            let confirmation = confirm('Are you sure you want to reset the game?')
            if (confirmation === true) {
                resetGame();
                divGameReset.style.pointerEvents = 'none';
                divGameReset.style.opacity = '0.5';  
                divGameReset.style.border = 'none';
            }
        } else {
            resetGame();
            divGameReset.style.pointerEvents = 'none';
            divGameReset.style.opacity = '0.5';  
            divGameReset.style.border = 'none';        }
    })

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
        makeStartButtonHide();
        enableGameField();
        showInfoText();
        for (const field of divFieldClick) {
            field.textContent = '';
        }
    }

})();

/* 
TO DO:
- Refractor Code into objects, get rid of huge IIFE
- Style game

DONE
- after three played rounds, showing results doesn't work
- Build instructions button
- Build ingame display to show winner
- Build funtionality if no player wins!
- 'Start new round' also works when there is no winner but counts round number up
- build better function for check win function (don't repeat!)
- restart playTurn() not working correctly for now
- startNewRound() giving two winner alerts, but Tie working correctly
- update of roundCound on website not working correct
- Clicking a already chosen field does increase round count!!
- Clicking a already chosen field does increase playerScore count after game is finished!!
- Clicking an empty field does increase playerScore count after game is finished!!
- Add 'are you sure?' question when clicking reset button while roundCount() is < 3
- Round 4 is shown after 3 rounds played

Notes about winning conditions:
- 3 rounds played, one has more points
- 3 rounds played, tie
- 2 rounds played, one has two points 
*/
