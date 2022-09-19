"use strict";
const mainListItems = document.querySelector(".main__list-items");
const startButton = document.querySelector(".start__game-button");
const startGameBlock = document.querySelector(".start__game");
const restartGameBlock = document.querySelector(".restart__game");
const restartButton = document.querySelector(".restart__game-button");

const allImages = [
  { img: "img/albus-dumbledore.jpg", alt: "Dumbledore", id: 1 },
  { img: "img/harry-potter.jpg", alt: "Harry Potter", id: 2 },
  { img: "img/lord-voldemort.jpg", alt: "Lord Voldemort", id: 3 },
  { img: "img/dobby.jpg", alt: "Dobby", id: 4 },
  { img: "img/ron-weasley.jpg", alt: "Ron Weasley", id: 5 },
  { img: "img/hermione-granger.jpg", alt: "Hermione Granger", id: 6 },
];

const addClassForItem = (item, className) => item.classList.add(className);

const removeClassForItem = (item, className) =>
  item.classList.remove(className);

const addClassForEachItem = (arr, className) =>
  arr.forEach((item) => item.classList.add(className));

const removeClassForEachItem = (arr, className) =>
  arr.forEach((item) => item.classList.remove(className));

const shuffleAray = (array) => {
  for (
    let j, x, i = array.length;
    i;
    j = parseInt(Math.random() * i),
      x = array[--i],
      array[i] = array[j],
      array[j] = x
  );
};

const gameCards = [...allImages, ...allImages];
shuffleAray(gameCards);

startButton.addEventListener("click", () => {
  addClassForItem(mainListItems, "animated");
  removeClassForEachItem(allCards, "_hide");
  addClassForItem(startGameBlock, "_hide");
  beforeGameStart(allCards);
});

const renderData = () => {
  gameCards.map((card) => {
    const html = `<li class="list__item" id=${card.id}>
    <div class="front">
      <img src="img/fontImage.jpg" alt="" class="front-img img" />
    </div>
    <div class="back">
      <img src=${card.img} alt='${card.alt}' class="back-img img">
    </div>
    </li>`;
    mainListItems.insertAdjacentHTML("beforeend", html);
  });
};
renderData(gameCards);

const allCards = document.querySelectorAll(".list__item");
addClassForEachItem(allCards, "_hide");

const openCard = (targetListItem) => {
  addClassForItem(targetListItem, "_flip");
  opened.push(targetListItem);
};

const closeCard = () => {
  removeClassForEachItem(opened, "_flip");
};

const ifAllCardsAreFlipped = () => {
  if (mainListItems.childNodes.length === 0) {
    opened = [];
    addClassForItem(restartGameBlock, "animated");
    removeClassForItem(restartGameBlock, "_hide");
    removeClassForItem(mainListItems, "animated");
  }
};

const beforeGameStart = function (allCards) {
  addClassForEachItem(allCards, "_flip");

  setTimeout(() => {
    removeClassForEachItem(allCards, "_flip");
  }, 2000);
};

let opened = [];

const sameCard = () =>
  setTimeout(() => {
    if (opened.length === 2 && opened[0].id === opened[1].id) {
      removeCart();
      opened = [];
    }
  }, 1000);

const diffCard = () =>
  setTimeout(() => {
    if (opened.length === 2 && opened[0].id != opened[1].id) {
      closeCard();
      opened = [];
    }
  }, 1000);

const removeCart = () =>
  opened.forEach((card) => {
    addClassForItem(card, "deleted");
    setTimeout(function () {
      card.remove();
      ifAllCardsAreFlipped();
    }, 1500);
  });

mainListItems.addEventListener("click", (event) => {
  const target = event.target;
  const targetListItem = target.closest(".list__item");

  if (target.classList.contains("front-img") && opened.length < 2) {
    openCard(targetListItem);
  }
  if (opened.length === 2) {
    diffCard();
    sameCard();
  }
});

restartButton.addEventListener("click", function () {
  const allCards = document.querySelectorAll(".list__item");
  removeClassForItem(restartGameBlock, "animated");
  addClassForItem(restartGameBlock, "_hide");
  addClassForItem(mainListItems, "animated");
  renderData(gameCards);
  removeClassForEachItem(allCards, "deleted");
  beforeGameStart(allCards);
});
