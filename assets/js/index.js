const cards = document.querySelectorAll('.memory-card');

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


//----- TRYING MODALS -----
//IS THIS ONE=> 

/*function checkForUserData() {
    if () {
        setTimeout(function() {
            $("#userInfoModal").modal({
                backdrop: 'static',
                keyboard: false
            });
    }, 500);*/
    
function startTimerCount(){
	timer = setInterval(function(){ 
        timeCounter = timeCounter + 1;
        if(timeCounter >= 100){
            gameOver();
        }
        else{
            document.getElementById('time-remaining').innerHTML = 'Timer: ' + timeCounter; 
        }
 }, 1000);
}

function flipCard() {
    console.log('flip');
	if (firstClick){
        firstClick = false;
        console.log('start timer');
		startTimerCount();
	}
	
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
   //$('#cardFlipAudio')[0].play();
    
    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
    //second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
    moveCounter = moveCounter + 1;
    document.getElementById('moves').innerHTML = 'Moves: ' + moveCounter;   
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch){ 
		disableCards();
        //this.audioController.match();
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
    }, 1500);
}

//Reset Btn
$('.reset-btn').click(function() {
    resetGame();
});

function displayModal() {
    // Access  modal <span> element (x), closes  modal
    const modalClose = document.getElementsByClassName("close")[0];
    // When the game is won set modal to display block to show it
    modal.style.display= "block";
    // When the user clicks on <span> (x), close the modal
    modalClose.onclick = function() {
    modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// --- STOP TIMER ---
function stopTime() {
    clearInterval(timer);
}

// --- GAME OVER ---
function gameOver() {
    stopTime();
   if (winGame()){
        console.log("User Won");
   }
   else{
    console.log("You loose"); 

   }
 
}

//Win Btn
$('#win-modal-close-btn').click(function() {
    resetGame();
    $('#winModal').modal('hide');
});

// --- WIN GAME ---
function winGame () {
    
    if (scoreCounter=== 9) {
        // displayVictoryModal();
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