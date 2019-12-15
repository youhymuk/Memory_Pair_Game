var CARDS = document.querySelectorAll('.card');

var hasFlippedCard = false;
var firstCard, secondCard;
var lockBoard = false;
var cardsLeft = 12;

function flipCard() {
	if(lockBoard) return;
	if(this === firstCard) return;
	
	this.classList.add('flip');

	if(!hasFlippedCard) {
		//first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	//second click
	hasFlippedCard = false;
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	var isMatch = firstCard.dataset.value === secondCard.dataset.value;

	isMatch ? disableCards() : unflipCards();
}


function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}



function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1200);
}

function resetBoard () {
	hasFlippedCard = false;
	lockBoard = false;
	firstCard = null;
	secondCard = null;
}

(function shuffle() {
	CARDS.forEach(card => {
		var randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

CARDS.forEach(card => card.addEventListener('click', flipCard));