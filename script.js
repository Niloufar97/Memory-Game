const cardContainer = document.querySelector(".card-container");
const newGameButton = document.getElementById("new-game-btn");
// timer
const seconds = document.getElementById("seconds");
// movements
const movementsContainer = document.getElementById("movements");

const cards = [
  {
    name: "bear",
    img: "./assets/images/cards/bear.svg",
  },
  {
    name: "crab",
    img: "./assets/images/cards/crab.svg",
  },
  {
    name: "shrimp",
    img: "./assets/images/cards/shrimp.svg",
  },
  {
    name: "lion",
    img: "./assets/images/cards/lion.svg",
  },
  {
    name: "zebra",
    img: "./assets/images/cards/zebra.svg",
  },
  {
    name: "fox",
    img: "./assets/images/cards/fox.svg",
  },
  {
    name: "jellyfish",
    img: "./assets/images/cards/jellyfish.svg",
  },
  {
    name: "penguin",
    img: "./assets/images/cards/penguin.svg",
  },
];

let selectedCards = [];
const matchedCards = [];
let clickCounter = 0;
let movementsCounter = 0;
let timer = null;

// doublecards----------------------------------------------------------------------

const doublingCards = () => {
  let doubleCards = [...cards, ...cards];
  const doubleCardsWithId = doubleCards.map((card, index) => {
    return { ...card, id: index + 1 };
  });
  return doubleCardsWithId;
};

//shuffle cards------------------------------------------------------------

const shufflingCards = () => {
  const cards = doublingCards();
  const shuffledCards = cards.sort(() => Math.random() - 0.5);
  return shuffledCards;
};

// create dynamic cards ----------------------------------------------------------------

const createCardDiv = (card) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.id = card.id;
  const frontCardDiv = document.createElement("div");
  frontCardDiv.classList.add("card-front");
  const backCardDiv = document.createElement("div");
  backCardDiv.classList.add("card-back");
  const backCardImg = document.createElement("img");
  backCardImg.src = card.img;
  backCardDiv.appendChild(backCardImg);
  cardDiv.appendChild(frontCardDiv);
  cardDiv.appendChild(backCardDiv);
  return cardDiv;
};

// flippingCards-------------------------------------------------------------------

const flippingCards = (flipCard) => {
  flipCard.classList.add("flipped");
};
// flippingBack cars--------------------------------------------------------------

let flipingBackCard = (flipBack) => {
  flipBack.classList.remove("flipped");
};
// rendering cards-----------------------------------------------------------------

const updateCards = () => {
  const shuffledcards = shufflingCards();
  const renderShuffledCards = () => {
    shuffledcards.map((card) => {
      const cardDiv = createCardDiv(card);
      cardContainer.appendChild(cardDiv);
      cardDiv.addEventListener("click", () => {
        clickHandler(cardDiv, card);
      });
    });
  };
  renderShuffledCards();
};
updateCards();

// click handler function----------------------------------------------------

function clickHandler(cardDiv, card) {
  clickCounter++;
  if (clickCounter === 1) {
    startTimer();
  }

  flippingCards(cardDiv);

  if (!matchedCards.includes(card) && !selectedCards.includes(card)) {
    selectedCards.push(card);
  }

  if (selectedCards.length === 2) {
    checkMatch();
    movementsCounter++;
    movementsContainer.textContent = movementsCounter;
  }
}

// checkMatch function--------------------------------------------------------

function checkMatch() {
  let firstCard = selectedCards[0];
  let secondCard = selectedCards[1];
  let firstCardDiv = document.getElementById(`${firstCard.id}`);
  let secondCardDiv = document.getElementById(`${secondCard.id}`);

  if (firstCard.name === secondCard.name) {
    firstCardDiv.classList.add("flipped");
    secondCardDiv.classList.add("flipped");
    selectedCards = [];

    matchedCards.push(firstCard);
    matchedCards.push(secondCard);
    
    // check if all cards matched
    if(matchedCards.length === 16){
      stopTimer()
      alert('you win')
    }
    
  } else {
    setTimeout(() => {
      flipingBackCard(firstCardDiv);
      flipingBackCard(secondCardDiv);
    }, 1000);
    selectedCards = [];
  }
}

// start timer function------------------------------------------------

const startTimer = () => {
  let second = 0;
  let minute = 0;
  timer = setInterval(() => {
    second++;
    if (second >= 60) {
      second = 0;
      minute++;
    }
    const formattedTime = `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    seconds.textContent = formattedTime;
  }, 1000);
};

// stop timer function---------------------------------------------------

const stopTimer = () => {
  clearInterval(timer);
};

// new game button fuction------------------------------------------------

newGameButton.addEventListener("click", () => {
  // reset cards
  cardContainer.innerHTML = "";
  updateCards();

  // reset timer
  clickCounter = 0;
  seconds.textContent = "00:00";
  stopTimer();

  // reset movements
  movementsCounter = 0;
  movementsContainer.textContent = 0 ;
});

// game ends -------------------------------------------------------------------
