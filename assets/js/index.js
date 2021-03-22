const cards = document.querySelectorAll('.memory-card');
const playAgain = document.querySelector(".play-again-btn");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCounter = 0;
let timeCounter = 0;
var scoreCounter = 0;
let userAvatar = localStorage.getItem("userAvatar");
let userName = '';
let pokemonName = '';
let flipSound= '';
let matchSound= '';
var timer = null;
var firstClick = true;
const reset = document.querySelector(".reset-btn");


$('#userInfoModal').modal('show');
    if (1==1) {
        setTimeout(function() {
                $("#userInfoModal").modal({
                    backdrop: 'static',
                    keyboard: false
                });
        }, 500);
    }
    ButtonClick
// play button click audio on all button elements
$('.btn').click(function() {
    playButtonAudio();
});

function playButtonAudio() {
    $('#ButtonClick')[0].currentTime = 0;
    $('#ButtonClick')[0].play();
}

function resetGame(){
    stopTime();
    flipped = document.querySelectorAll('.flip');
    [].forEach.call(flipped, function(el) {
        el.classList.remove("flip");
    });
    moveCounter = 0;
    timeCounter = 0;
    scoreCounter = 0;
    firstClick = true;
    timer = null;
    loadCards();
    document.getElementById('moves').innerHTML = 'Moves: ' + moveCounter;
    document.getElementById('time-remaining').innerHTML = 'Timer: ' + timeCounter;   
    document.getElementById('score').innerHTML='Score: ' +  scoreCounter;
}

function setUserName(event){
    userName = event.target.innerHTML;
    alert(`I am ` +  userName + ` !`);
}
nameOptions = document.querySelectorAll('.username');
nameOptions.forEach(card => card.addEventListener('click', setUserName));


function setPokemonName(event){
    pokemonName = event.target.getAttribute("data-name");
    alert(pokemonName + ' I CHOOSE YOU!');
}
pokemonOptions = document.querySelectorAll('.pokemonOption');
pokemonOptions.forEach(card => card.addEventListener('click', setPokemonName));

   
function startTimerCount(){
	timer = setInterval(function(){ 
        timeCounter = timeCounter + 1;
        if(timeCounter >= 300){
            $('#GameOverAudio')[0].currentTime = 0;
            $('#GameOverAudio')[0].play();
            gameOver();
        }
        else{
            document.getElementById('time-remaining').innerHTML = 'Timer: ' + timeCounter; 
        }
 }, 1000);
}

function flipCard() {
	if (firstClick){
        firstClick = false;
		startTimerCount();
	}
	
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    
    if (!hasFlippedCard) {
        //first click
        $('#FlipAudio')[0].currentTime = 0;
        $('#FlipAudio')[0].play();
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
    //second click
    hasFlippedCard = false;
    secondCard = this;
    $('#FlipAudio')[0].currentTime = 0;
    $('#FlipAudio')[0].play();
    checkForMatch();
    moveCounter = moveCounter + 1;
    document.getElementById('moves').innerHTML = 'Moves: ' + moveCounter;   
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch){ 
        $('#MatchAudio')[0].currentTime = 0;
        $('#MatchAudio')[0].play();
		disableCards();
		scoreCounter = scoreCounter + 1; 
        document.getElementById('score').innerHTML='Score: ' +  scoreCounter;
        if (winGame()){
            
            gameOver();
        }

	}
	else{
		 unflipCards();
	}
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1200);
}

//Reset Btn
$('.reset-btn').click(function() {
    resetGame();
});

// --- STOP TIMER ---
function stopTime() {
    clearInterval(timer);
}

// --- GAME OVER ---
function gameOver() {
    stopTime();
    if (winGame()){
        displayModal();
    }
    else{
    $('#GameOverAudio')[0].currentTime = 0;
    $('#GameOverAudio')[0].play();
    alert(`GAME OVER! Let's Try Again...`);
    resetGame();
    }
 
}

//Play-Again Btn
$('.play-again-btn').click(function() {
    resetGame();
    $('#WinModal').modal('hide');
});

// --- WIN GAME ---
function winGame () {
    
    if (scoreCounter=== 9) {
        $('#VictoryAudio')[0].currentTime = 0;
        $('#VictoryAudio')[0].play();
        $('#WinModal').modal('show');
        return true;
    }
    return false;
}



function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Immediately Invoked Function Expression IIFE //
function shuffleCards(){

    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*18);
        card.style.order = randomPos;
    });
    

}


function loadCards(){
    shuffleCards();
    cards.forEach(card => card.addEventListener('click', flipCard));
}
loadCards();