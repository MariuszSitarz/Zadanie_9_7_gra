var newGameBtn = document.getElementById('js-newGameButton');

document.addEventListener("keyup", function (event) {  //keyup button, function checks which button was pressed
    switch (event.keyCode) {
        case 13:               //13 in ASCII code stands for 'enter'
            if (gameState != 'started') newGame();
            break; // stops selecting
        case 65:                 //65 in ASCII code stands for 'a'
            if (gameState = 'started') playerPick('rock');
            break;
        case 83: // 83 in ASCII code stands for 's'
            if (gameState = 'started') playerPick('paper');
            break;
        case 68: // 68 in ASCII code stands for 'd'
            if (gameState = 'started') playerPick('scissors');
            break;
        case 84: //84 in ASCII code stands for 't'
            if (gameState = 'started') {

            while (gameState == 'started') {  //loop for random winner
                var computerPick = getComputerPick();  // variables for random choices both computer and player
                var playerRandom = getComputerPick();

                playerPickElem.innerHTML = playerRandom;
                computerPickElem.innerHTML = computerPick;

                checkRoundWinner(playerRandom, computerPick);

            }
            }
    }

});

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
    playerPick('rock')
});
pickPaper.addEventListener('click', function () {
    playerPick('paper')
});
pickScissors.addEventListener('click', function () {
    playerPick('scissors')
});

var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Insert coin';
            player.score = 0;
            computer.score = 0;
            setGamePoints();
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');


function newGame() {
    playSound();
    setTimeout(function () {   //Timeout set to delay prompt (for playing sound first)
        player.name = prompt('Please enter your name', 'imię gracza');
        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            playerNameElem.innerHTML = player.name;
            setGamePoints();

        }
    }, 1000);
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}


function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';
    var drawplayer = "REMIS!";
    var drawComputer = "REMIS";

    if (playerPick == computerPick) {

        winnerIs = 'REMIS!';
        computerResultElem.innerHTML = drawComputer;
        playerResultElem.innerHTML = drawplayer;

    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = player.name + " Wins!";
        player.score++;
        setGamePoints();
        checkGameWinner();

    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wins!";
        computer.score++;
        setGamePoints();
        checkGameWinner();
    }

}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

var winnermsg = document.getElementById('winnermsg');

function checkGameWinner() {

    if (player.score === 10) {
        winnermsg.innerHTML = player.name + " wins the game!";
        gameState = 'ended';
        setGameElements();
        winnerSound();

    }
    else if (computer.score === 10) {
        winnermsg.innerHTML = 'Computer wins the game!';
        gameState = 'ended';
        setGameElements();
        looserSound();

    }
}

function playSound() {
    var sound = document.getElementById("audio");
    sound.play();
}

function looserSound() {
    var sound = document.getElementById("loosersound");
    sound.play();
}

function winnerSound() {
    var sound = document.getElementById("winnersound");
    sound.play();
}