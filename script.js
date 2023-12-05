const cardContainer = document.querySelector('.card-container')
const cards = [
    {
        id: 1,
        name: "bear",
        img: './assets/images/cards/bear.svg'
    },
    {
        id: 2,
        name: "bear",
        img: './assets/images/cards/bear.svg'
    },
    {
        id: 3,
        name: "crab",
        img: './assets/images/cards/crab.svg'
    },
    {
        id: 4,
        name: "crab",
        img: './assets/images/cards/crab.svg'
    },
    {
        id: 5,
        name: "shrimp",
        img: './assets/images/cards/shrimp.svg'
    },
    {
        id: 6,
        name: "shrimp",
        img: './assets/images/cards/shrimp.svg'
    },
    {
        id: 7,
        name: "lion",
        img: './assets/images/cards/lion.svg'
    },
    {
        id: 8,
        name: "lion",
        img: './assets/images/cards/lion.svg'
    },
    {
        id: 9,
        name: "zebra",
        img: './assets/images/cards/zebra.svg'
    },
    {
        id: 10,
        name: "zebra",
        img: './assets/images/cards/zebra.svg'
    },
    {
        id: 11,
        name: "fox",
        img: './assets/images/cards/fox.svg'
    },
    {
        id: 12,
        name: "fox",
        img: './assets/images/cards/fox.svg'
    },
    {
        id: 13,
        name: "jellyfish",
        img: './assets/images/cards/jellyfish.svg'
    },
    {
        id: 14,
        name: "jellyfish",
        img: './assets/images/cards/jellyfish.svg'
    },
    {
        id: 15,
        name: "penguin",
        img: './assets/images/cards/penguin.svg'
    },
    {
        id: 16,
        name: "penguin",
        img: './assets/images/cards/penguin.svg'
    },
]
cards.map((card) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const cardFrontDiv = document.createElement('div');
    cardFrontDiv.classList.add('card-front');
    const cardBackDiv = document.createElement('div');
    cardBackDiv.classList.add('card-back');
    const cardImg = document.createElement('img');
    cardImg.src = card.img;
    cardBackDiv.appendChild(cardImg)
    cardDiv.appendChild(cardBackDiv)
    cardDiv.appendChild(cardFrontDiv)
    cardContainer.appendChild(cardDiv)

})
const cardsDiv = document.querySelectorAll('.card')
cardsDiv.forEach((card) => {
    card.addEventListener('click' , () => {
        card.classList.toggle('flipped')
    })
})
