/* Tick tack toe game has: 
- Player
- Gamesscore
- Gamelogic
- Userinput
*/

// Function to create player
function newPlayer (name) {
    let GameScore = 0;
    const getGameScore = () => GameScore;
    const increaseGameScore = () => GameScore++;

    return {name, GameScore, getGameScore, increaseGameScore}
}

const player1 = newPlayer('Flo'); // Should be replaced with user input
const player2 = newPlayer('Tobi'); // Should be replaced with user input

// player1.increaseGameScore();

// console.log({
//     name: player1.name,
//     GameScore: player1.getGameScore()
// });

// Function for Gamelogic
