/* Tick tack toe game has: 
- Player
- Gamesscore
- Gamelogic
- Userinput
*/

const Game = (function() {
    const gameBoard = [
        1, 2, 3, 
        4, 5, 6, 
        7, 8, 9
    ];


    // Factory Function to create player and to keep track on gameScore
    function newPlayer(name) {
        let GameScore = 0;
        const getGameScore = () => GameScore;
        const increaseGameScore = () => GameScore++;
        
        return {name, getGameScore, increaseGameScore}
    }
    const player1 = newPlayer('Flo'); // Should be replaced with user input
    const player2 = newPlayer('Tobi'); // Should be replaced with user input
    

    // Factory Function to create number of played rounds
    function newRound() {
        let roundCount = 1;
        const getRoundCount = () => roundCount;
        const increaseRoundCount = () => roundCount++;

        return {getRoundCount, increaseRoundCount}
    }
    const roundCount = newRound();
    

    // Function to play one round
    function playRound() {
        // Get user input
        let input;
        do {
            input =  Number(prompt('choose 1-9'))
            if (isNaN(input) || isNaN('') || input > 9 || input < 1) {
                alert('Wrong input. Please choose a number between 1-9')
            } else if (!(gameBoard.includes(input))) {
                alert('already chosen, please choose again')
            } 
        } while (!(gameBoard.includes(input)))
        
        // Replace user choice in game array
        const index = gameBoard.indexOf(input)
        if (roundCount.getRoundCount() % 2 !== 0) {
            if (gameBoard.includes(input)) {
                gameBoard[index] = 'X';
            } 
        }  else if (roundCount.getRoundCount() % 2 === 0) {
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
              alert('Player 1 wins!');
              return true;
            } else if (gameBoard[combination[0]] === 'O' &&
                       gameBoard[combination[1]] === 'O' &&
                       gameBoard[combination[2]] === 'O') {
              alert('Player 2 wins!');
              return true;
            } 
          }
    }

    // Function to play nine rounds or till one wins
    function playGame() {
        while (roundCount.getRoundCount() <= 5) {
            console.log({
                RoundCount: roundCount.getRoundCount(),
            });
            playRound()
            if (checkForWin() === true) {
                break
            } 
            if (roundCount.getRoundCount() === 5) {
                alert('Tie!')
            }
            roundCount.increaseRoundCount();
            console.log(gameBoard);
        }
    }

    // playGame();

})();

/* 
TO DO
- Split playRound() into two factory functions
- work on refactoring spaghetti code. Learn how to do this
- Better understand how to write good functions


DONE
- build better function for check win function (don't repeat!)
- restart playRound() not working correctly for now
- playGame() giving two winner alerts, but Tie working correctly

*/