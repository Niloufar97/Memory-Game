const cardContainer = document.querySelector(".card-container");
const newGameButton = document.getElementById("new-game-btn");

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
// flippingCards-----------------------------------------------------------------------------
const flippingCards = (flipCard) => {
  flipCard.classList.add("flipped");
};
// flippingBack cars-------------------------------------------------------------------
let flipingBackCard = (flipBack) => {
  flipBack.classList.remove("flipped");
};
// rendering cards-----------------------------------------------------------------
let selectedCards = [];
let counter = 0;
const updateCards = () => {
  const shuffledcards = shufflingCards();
  const renderShuffledCards = () => {
    shuffledcards.map((card) => {
      const cardDiv = createCardDiv(card);
      cardContainer.appendChild(cardDiv);
      cardDiv.addEventListener("click", () => {
        counter++;
        if (counter < 3 && !selectedCards.includes(card)) {
          PushCardInArray(card, cardDiv);
          //check match
        }
        if (counter >= 3 && !selectedCards.includes(card)) {
          FlipbackSelected();
          selectedCards = [];
          PushCardInArray(card, cardDiv);
          counter = 1;
        }

        console.log(selectedCards);
      });
    });
  };
  renderShuffledCards();
};
updateCards();
// new game button fuction------------------------------------------------
newGameButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  updateCards();
});
function FlipbackSelected() {
  selectedCards.forEach((element) => {
    flipingBackCard(document.getElementById(`${element.id}`));
    //todo: flip all back except ones with class fixed
  });
}

function PushCardInArray(card, cardDiv) {
  selectedCards.push(card);
  flippingCards(cardDiv);
}
