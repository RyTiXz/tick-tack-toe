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


    // Function to create player and to keep track on gameScore
    function newPlayer(name) {
        let GameScore = 0;
        const getGameScore = () => GameScore;
        const increaseGameScore = () => GameScore++;
        
        return {name, getGameScore, increaseGameScore}
    }
    const player1 = newPlayer('Flo'); // Should be replaced with user input
    const player2 = newPlayer('Tobi'); // Should be replaced with user input
    

    // Function to create number of played rounds
    function newRound() {
        let roundCount = 1;
        const getRoundCount = () => roundCount;
        const increaseRoundCount = () => roundCount++;

        return {getRoundCount, increaseRoundCount}
    }
    const roundCount = newRound();
    

    // Function to play one round
    function playRound() {
        console.log({
            RoundCount: roundCount.getRoundCount(),
        });
        const input = Number(prompt('choose 1-9'));
        const index = gameBoard.indexOf(input)
        if (roundCount.getRoundCount() % 2 !== 0) {
            if (gameBoard.includes(input)) {
                gameBoard[index] = 'X';
            } else {
                alert('already choosen, start round from start');
                // playRound()
            }
        }  else if (roundCount.getRoundCount() % 2 === 0) {
            if (gameBoard.includes(input)) {
                gameBoard[index] = 'O';
            } else {
                alert('already choosen, start round from start');
                // playRound()
            }
        }
        console.log(gameBoard);
        roundCount.increaseRoundCount();
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
              console.log('Player 1 wins!');
              return true;
            } else if (gameBoard[combination[0]] === 'O' &&
                       gameBoard[combination[1]] === 'O' &&
                       gameBoard[combination[2]] === 'O') {
              console.log('Player 2 wins!');
              return true;
            }
          }
    }

    // Function to play nine rounds or till one wins
    function playGame() {
        while (roundCount.getRoundCount() <= 5) {
            playRound()
            if (checkForWin() === true) {
                break
            } 
        }
        if (checkForWin() !== true) {
            console.log('Tie!')
        }
    }
    playGame();

})();

/* 
TO DO
- restart playRound() not working correctly for now
- 

DONE
- build better function for check win function (don't repeat!)

*/