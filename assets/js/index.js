const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCounter = 0;
let timeCounter = 0;
let scoreCounter = 0;

/*class audioController {
    constructor() {
        this.flipSound = new Audio('/assets/audio/flip-card.mp3');
        this.matchSound = new Audio('/assets/audio/matched.mp3');
        this.victorySound = new Audio('/assets/audio/victory.mp3');}

    flip(){
        this.flipSound.play();}

    match(){
        this.matchSound.play();}

    victory(){
        this.victorySound.play();}
} */

//----- TRYING MODALS -----
//IS THIS ONE=> 
/*$(document).ready(function() {
    setTimeout(function(){
        $("#userInfoModal").modal('show');
    },500);
});
//OR THIS ONE=> 
setTimeout(function() {
    $("#userInfoModal").modal({
        backdrop: 'static',
        keyboard: false
    });
}, 500);*/

function timer(){
	setInterval(function(){ 
		timeCounter = timeCounter + 1;
		document.getElementById('time-remaining').innerHTML = 'Timer: ' + timeCounter; 
		
 }, 1000);
	
}

function flipCard() {
	if (timeCounter ===0){
		timer();
	}
	
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    
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

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*18);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
