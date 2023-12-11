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
const doublingCards = () =>{
  let doubleCards = [...cards, ...cards];
  const doubleCardsWithId = doubleCards.map((card, index) => {
    return { ...card, id: index + 1 };
  });
  return doubleCardsWithId
}
//shuffle cards------------------------------------------------------------
const shufflingCards = () => {
  const cards = doublingCards()
  const shuffledCards = cards.sort(() => Math.random() - 0.5);
  return shuffledCards;
};
// create dynamic cards ----------------------------------------------------------------
const createCardDiv = (card) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
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
const flippingCards = (card) => {
  card.classList.toggle("flipped");
};
// rendering cards------------------------------------------------------------------------
const updateCards = () => {
  const shuffledcards = shufflingCards();
  const renderShuffledCards = () => {
    shuffledcards.map((card) => {
      const cardDiv = createCardDiv(card);
      cardContainer.appendChild(cardDiv);
      cardDiv.addEventListener("click", () => {
        flippingCards(cardDiv);
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
