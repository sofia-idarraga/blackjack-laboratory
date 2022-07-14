//---------------------------

let ulCards = document.getElementById("cards");
let liCard1 = document.getElementById("first-card");
let liCard2 = document.getElementById("second-card");
let sumMessage = document.getElementById("sum");
let resultMessage = document.getElementById("result-message");
let gainMessage = document.getElementById("gain");
let refresh = document.getElementById("refresh-button");
let startButton = document.getElementById("start-button");

refresh.addEventListener("click", (_) => {
  location.reload();
});

startButton.addEventListener("click", () => {
  refresh.classList.replace("refresh-button", "refresh-button-visible");
  startButton.classList.replace("start-button", "start-button-dissable");
  startGame();
});
//-------------------

class Card {
  constructor(pip, value) {
    this.pip = pip;
    this.value = value;
  }
  addSuit(suit) {
    this.suit = suit;
  }

  setValue(value) {
    this.value = value;
  }

  getDetails() {
    return `Pip is ${this.pip},
      Value is: ${this.value}, 
      Suit is ${this.suit}`;
  }
}

class Game {
  constructor(sum, gain, playerCards) {
    this.sum = sum;
    this.gain = gain;
    this.playerCards = playerCards;
  }

  checkWin() {
    if (this.sum >= 18 && this.sum <= 21) {
      console.log("You win! ");
      resultMessage.classList.replace("winner-hidden", "winner");
      resultMessage.innerText = "You win! ";
      return true;
    }
    console.log("You lose! ");
    resultMessage.classList.replace("winner-hidden", "winner");
    resultMessage.innerText = "You lose! ";
    return false;
  }

  checkSum(win) {
    if (win) {
      this.gain += 1000;
    }
  }
}

let card1 = new Card("1", 1);
let card2 = new Card("2", 2);
let card3 = new Card("3", 3);
let card4 = new Card("4", 4);
let card5 = new Card("5", 5);
let card6 = new Card("6", 6);
let card7 = new Card("7", 7);
let card8 = new Card("8", 8);
let card9 = new Card("9", 9);
let card10 = new Card("10", 10);
let card11 = new Card("J", 11);
let card12 = new Card("Q", 11);
let card13 = new Card("K", 11);
let card14 = new Card("A", 11);

const cards = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
  card13,
  card14,
];

const suits = ["♠", "♥", "♣", "♦"];

const randomCard = () => {
  let cardId = Math.floor(Math.random() * cards.length);
  let suitId = Math.floor(Math.random() * suits.length);
  let card = cards[cardId];
  let suit = suits[suitId];
  card.addSuit(suit);
  return card;
};

function selectCard(selectedCards) {
  let newcard = randomCard();
  while (selectedCards.includes(newcard)) {
    newcard = randomCard();
  }
  return newcard;
}

const isA = (card) => {
  resultMessage.innerText = " ";

  if (card.pip === "A") {
    let input = prompt("Your A's value is 11 or 1? (11/1): ");
    let entrance = Number(input);
    while (entrance != 1 && entrance != 11) {
      input = prompt(
        "Your entrance is not valid, please write it again: (11/1)"
      );
      entrance = Number(input);
    }
    card.setValue(entrance);
    console.log(card);
  }
};

function nextRound(game) {
  console.log("____________________________");

  console.log("NEXT ROUND!!. ");
  console.log(game.playerCards);
  const firstCard2 = selectCard(game.playerCards);
  isA(firstCard2);
  game.playerCards.push(firstCard2);
  liCard1.innerText = firstCard2.suit + firstCard2.pip;
  console.log(game.playerCards);
  console.log("____________________________");

  const secondCard2 = selectCard(game.playerCards);
  isA(secondCard2);
  game.playerCards.push(secondCard2);
  console.log(game.playerCards);
  liCard2.innerText = secondCard2.suit + secondCard2.pip;

  console.log("____________________________");

  game.sum = firstCard2.value + secondCard2.value;
  console.log("Your sum is: " + game.sum);
  sumMessage.innerText = `Your sum is: ${game.sum}`;
  let win = game.checkWin();
  game.checkSum(win);
  console.log("You gain: " + game.gain);
  gainMessage.innerText = "Your gain is: $" + game.gain;

  return win;
}

function startGame() {
  let sum = 0;
  let gain = 0;
  const playerCards = [];
  const game = new Game(sum, gain, playerCards);

  const firstCard = selectCard(game.playerCards);
  isA(firstCard);
  game.playerCards.push(firstCard);
  console.log(game.playerCards);

  liCard1.innerText = firstCard.suit + firstCard.pip;
  s;
  console.log("____________________________");

  const secondCard = selectCard(game.playerCards);
  isA(secondCard);
  game.playerCards.push(secondCard);
  console.log(game.playerCards);
  liCard2.innerText = secondCard.suit + secondCard.pip;
  console.log("____________________________");

  game.sum = firstCard.value + secondCard.value;
  console.log("Your sum is: " + game.sum);
  sumMessage.innerText = "Your sum is: " + game.sum;
  let win = game.checkWin();
  game.checkSum(win);
  console.log("You gain: " + game.gain);
  gainMessage.innerText = "Your gain is: $" + game.gain;

  setTimeout(function () {
    while (win) {
      let input = prompt("Do you wanna continue playing?: (Y/N) ");

      while (input.toUpperCase() != "Y" && input.toUpperCase() != "N") {
        input = prompt(
          " Invalid input. Do you wanna continue playing?: (Y/N) "
        );
      }
      if (input.toUpperCase() === "Y") {
        win = nextRound(game);
      }
      if (input.toUpperCase() === "N") {
        console.log("____________________________");

        console.log("See ya next time ;)");
        return;
      }
    }
  }, 500);

  console.log("____________________________");

  console.log("See ya next time ;)");
}
