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
                playRound()
            }
        }  else if (roundCount.getRoundCount() % 2 === 0) {
            if (gameBoard.includes(input)) {
                gameBoard[index] = 'O';
            } else {
                alert('already choosen, start round from start');
                playRound()
            }
        }
        console.log(gameBoard);
        roundCount.increaseRoundCount();
    }
    

    // Function to check for win
    function checkForWin() {
        if (gameBoard[0] === 'X' && gameBoard[3] === 'X' && gameBoard[6] === 'X') {
            console.log('Player 1 wins!')
        }
        if (gameBoard[1] === 'X' && gameBoard[4] === 'X' && gameBoard[7] === 'X') {
            console.log('Player 1 wins!')
        }
        if (gameBoard[2] === 'X' && gameBoard[5] === 'X' && gameBoard[8] === 'X') {
            console.log('Player 1 wins!')
        }
    }

    // Function to play nine rounds or till one wins
    function playGame() {
        while (roundCount.getRoundCount() <= 5) {
            playRound()
            checkForWin()
        }
    }
    // playGame();

})();

/* 
TO DO
- build better function for check win function (don't repeat!)
- restart playRound() not working correctly for now
- 

*/