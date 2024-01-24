const cardContainer = document.querySelector(".card-container");
const alertContainer = document.querySelector("[data-id='alert-container']");
const alertOverlay = document.querySelector("[data-id='alert-overlay']");
const winTime = document.querySelector("[data-id='win-time']");
const winMovements = document.querySelector("[data-id='win-movements']");
const newGameButtons = document.querySelectorAll("[data-id='new-game-btn']");
const backToMenuButtons = document.querySelector("[data-id='back-to-menu']");
// timer
const seconds = document.getElementById("seconds");
// movements
const movementsContainer = document.getElementById("movements");
// welcome section
const welcomePageSection = document.querySelector('[data-id = "welcome-page"]');
const easyLevelButton = document.querySelector('[data-id = "easy-level"]');
const hardLevelButton = document.querySelector('[data-id = "hard-level"]');
// game section
const gameSection = document.querySelector("[data-id = 'game']");

// navigate to game page------------------------------------------------------

easyLevelButton.addEventListener("click", () => {
  isEasyGame = true;
  welcomePageSection.style.display = "none";
  gameSection.style.display = "block";
  cardContainer.style.gridTemplateColumns = "repeat(4 , 1fr)";
  resetGame();
  fetchData().then((cards) => {
    updateCards(cards.easyLevel);
  });
});
hardLevelButton.addEventListener("click", () => {
  isEasyGame = false;
  welcomePageSection.style.display = "none";
  gameSection.style.display = "grid";
  cardContainer.style.gridTemplateColumns = "repeat(5 , 1fr)";
  resetGame();
  fetchData().then((cards) => {
    updateCards(cards.hardLevel);
  });
});
backToMenuButtons.addEventListener("click", () => {
  welcomePageSection.style.display = "flex";
  gameSection.style.display = "none";
  resetGame();
});
// fetch Data----------------------------------------------

async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Niloufar97/Niloufar97.github.io/main/memory-game/gameCards.json"
    );
    const cards = await response.json();
    return cards;
  } catch (error) {
    console.error(error);
  }
}


// async function easyLevelData(){
//   try{
//     const response = await fetch("https://raw.githubusercontent.com/Niloufar97/Niloufar97.github.io/main/memory-game/newGifts.json");
//     const cards = await response.json();
//     updateCards(cards);
//   }
//   catch(error){
//     console.error(error)
//   }
// }
// async function hardLevelData(){
//   const response = await fetch("https://raw.githubusercontent.com/Niloufar97/Niloufar97.github.io/main/memory-game/newCactus.json");
//   const cards = await response.json();
//   updateCards(cards);
// }
let cardLength = 0;
let isEasyGame;
let selectedCards = [];
let matchedCards = [];
let clickCounter = 0;
let movementsCounter = 0;
let timer = null;
let timeoutId = null;

// rendering cards-----------------------------------------------------------------

const updateCards = (cards) => {
  const doubledCards = doublingCards(cards);
  cardLength = doubledCards.length;
  const shuffledCards = shufflingCards(doubledCards);
  shuffledCards.forEach((card) => {
    const cardDiv = createCardDiv(card);
    cardContainer.appendChild(cardDiv);
    cardDiv.addEventListener("click", () => {
      clickHandler(cardDiv, card);
    });
  });
};

//shuffle cards------------------------------------------------------------

const shufflingCards = (cards) => {
  const shuffledCards = cards.sort(() => Math.random() - 0.5);
  return shuffledCards;
};

// doublecards----------------------------------------------------------------------

const doublingCards = (cards) => {
  let doubledCards = [...cards, ...cards];
  const doubleCardsWithId = doubledCards.map((card, index) => {
    return { ...card, id: index + 1 };
  });
  return doubleCardsWithId;
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

  if (selectedCards.length >= 3) {
    clearTimeout(timeoutId);
    selectedCards.forEach((selectedCard) => {
      const cardDiv = document.getElementById(`${selectedCard.id}`);
      flipingBackCard(cardDiv);
      selectedCards = [];
    });
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
    if (matchedCards.length % cardLength === 0) {
      stopTimer();
      setTimeout(() => {
        winAlert();
      }, 500);
    }
  } else {
    timeoutId = setTimeout(() => {
      flipingBackCard(firstCardDiv);
      flipingBackCard(secondCardDiv);
      selectedCards = [];
      timeoutId = null;
    }, 1200);
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
    const formattedTime = `${minute.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;
    seconds.textContent = formattedTime;
  }, 1000);
};

// stop timer function---------------------------------------------------

const stopTimer = () => {
  clearInterval(timer);
};

// new game button fuction------------------------------------------------
newGameButtons.forEach((newGameButton) => {
  newGameButton.addEventListener("click", () => {
    resetGame();
    alertOverlay.style.display = "none";
    alertContainer.style.display = "none";
    // reset cards
    isEasyGame
      ? fetchData().then((cards) => {
          updateCards(cards.easyLevel);
        })
      : fetchData().then((cards) => {
          updateCards(cards.hardLevel)
      });
  });
});
// reset game------------------------------------

const resetGame = () => {
  // reset cards
  cardContainer.innerHTML = "";

  // reset timer
  clickCounter = 0;
  seconds.textContent = "00:00";

  // reset movements
  movementsCounter = 0;
  movementsContainer.textContent = 0;

  // reset selected and matched cards
  selectedCards = [];
  matchedCards = [];

  clearTimeout(timeoutId);
  stopTimer();
};

// win alert popup--------------------------------------------------------
const winAlert = () => {
  alertOverlay.style.display = "block";
  alertContainer.style.display = "block";
  winMovements.innerText = movementsContainer.textContent;
  winTime.innerText = seconds.textContent;
};
