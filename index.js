"use strict";
const mainListItems = document.querySelector(".main__list-items");
const startButton = document.querySelector(".start__game-button");
const startGameBlock = document.querySelector(".start__game");
const restartGameBlock = document.querySelector(".restart__game");
const restartButton = document.querySelector(".restart__game-button");
let opened = [];

const allImages = [
  { img: "img/albus-dumbledore.jpg", alt: "Dumbledore" },
  { img: "img/harry-potter.jpg", alt: "Harry Potter" },
  { img: "img/lord-voldemort.jpg", alt: "Lord Voldemort" },
  { img: "img/dobby.jpg", alt: "Dobby" },
  { img: "img/ron-weasley.jpg", alt: "Ron Weasley" },
  { img: "img/hermione-granger.jpg", alt: "Hermione Granger" },
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

const allGameCards = [...allImages, ...allImages];
shuffleAray(allGameCards);

const displayTheCards = () => {
  allGameCards.map((card) => {
    const html = `<li class="list__item _hide">
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
displayTheCards(allGameCards);

const allCards = document.querySelectorAll(".list__item");

const openCard = (targetListItem) => {
  addClassForItem(targetListItem, "_flip");
  opened.push(targetListItem);

  opened.length === 2 ? diffCard() : sameCard();
};

const ifAllCardsAreFlipped = () => {
  if (mainListItems.childNodes.length === 0) {
    opened = [];
    addClassForItem(restartGameBlock, "animated");
    removeClassForItem(restartGameBlock, "_hide");
    removeClassForItem(mainListItems, "animated");
  }
};

const beforeGameStart = () => {
  const allCards = document.querySelectorAll(".list__item");
  addClassForEachItem(allCards, "_flip");

  setTimeout(() => {
    removeClassForEachItem(allCards, "_flip");
  }, 2000);
};

const sameCard = () =>
  setTimeout(() => {
    if (
      opened.length === 2 &&
      opened[0].lastElementChild.firstElementChild.src ===
        opened[1].lastElementChild.firstElementChild.src
    ) {
      opened.forEach((card) => {
        addClassForItem(card, "deleted");
        setTimeout(() => {
          card.remove();
          ifAllCardsAreFlipped();
        }, 1500);
      });
      opened = [];
    }
  }, 1500);

const diffCard = () =>
  setTimeout(() => {
    if (
      opened.length === 2 &&
      opened[0].lastElementChild.firstElementChild.src !=
        opened[1].lastElementChild.firstElementChild.src
    ) {
      removeClassForEachItem(opened, "_flip");
      opened = [];
    }
  }, 1000);

startButton.addEventListener("click", () => {
  addClassForItem(mainListItems, "animated");
  removeClassForEachItem(allCards, "_hide");
  addClassForItem(startGameBlock, "_hide");
  beforeGameStart();
});

restartButton.addEventListener("click", () => {
  removeClassForItem(restartGameBlock, "animated");
  addClassForItem(restartGameBlock, "_hide");
  addClassForItem(mainListItems, "animated");
  displayTheCards(allGameCards);
  removeClassForEachItem(allCards, "deleted");
  beforeGameStart();
});

mainListItems.addEventListener("click", (event) => {
  const target = event.target;
  const targetListItem = target.closest(".list__item");

  if (
    target.classList.contains("front-img") &&
    opened.length < 2 &&
    opened[0] != targetListItem
  ) {
    openCard(targetListItem);
  }
});
