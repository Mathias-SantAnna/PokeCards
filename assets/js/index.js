const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCounter = 0;
let timeCounter = 0;
let scoreCounter = 0;
let userAvatar = localStorage.getItem("userAvatar");
let userName = '';
let pokemonName = '';
let flipSound= '';
let matchSound= '';
const reset = document.querySelector(".reset-btn");


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
	setInterval(function(){ 
		timeCounter = timeCounter + 1;
		document.getElementById('time-remaining').innerHTML = 'Timer: ' + timeCounter; 
        if(this.timeCounter === 100)
            this.gameOver();
 }, 1000);
}

function flipCard() {
	if (timeCounter ===0){
		startTimerCount();
        
	}
	
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    $('#cardFlipAudio')[0].play();
    
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
    clearInterval(timeCounter);
}

// --- GAME OVER ---
function gameOver() {
    clearInterval(this.timeCounter);
    //this.audioController.gameOver();
}

//Win Btn
$('#win-modal-close-btn').click(function() {
    resetGame();
    $('#winModal').modal('hide');
});

// --- WIN GAME ---
function winGame () {
    if (isMatch.length === 9) {
        stopTime();
        displayVictoryModal();
    }
}



function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Immediately Invoked Function Expression IIFE //
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*18);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));