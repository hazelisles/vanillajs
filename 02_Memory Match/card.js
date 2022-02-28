const GAME_STATES = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatched: "CardsMatched",
  CardsUnmatched: "CardsUnmatched",
  GameFinished: "GameFinished"
}

const utility = {
  newDeck() {
    const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const symbols = ["/02_Memory Match/Clubs.png", "/02_Memory Match/Diamonds.png", "/02_Memory Match/Hearts.png", "/02_Memory Match/Spades.png"];
    const deck = [];
    for (let i = 0; i < symbols.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        deck.push({ num: numbers[j], symbol: symbols[i] })
      }
    }
    return deck;
  },
  getRandomOrderArray(num) {
    // use Fisher-Yates Shuffle to thorough shuffling
    const array = Array.from(Array(num).keys());
    for (let i = array.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randIndex]] = [array[randIndex], array[i]];
    }
    return array;
  }
}

const model = {
  deck: utility.newDeck(),
  tempCards: [],
}

const view = {
  displayCards(cardArray) {
    const board = document.getElementById("cards");
    board.innerHTML = cardArray.map(i => this.getCardElement(i)).join("");
  },
  getCardElement(index) {
    return `
    <div class="card d-flex flex-column justify-content-around back" data-index="${index}"></div>` // HTML data attribute
  },
  getCardContent(index) {
    const deck = model.deck;
    return `
      <p>${deck[index].num}</p>
      <img src="${deck[index].symbol}" alt="">
      <p>${deck[index].num}</p>
    `
  },
  flipCard(card) {
    if (card.classList.contains("back")) {
      card.classList.remove("back");
      card.innerHTML = this.getCardContent(Number(card.dataset.index));
    } else {
      card.classList.add("back");
      card.innerHTML = null;
    }
  }
}

const controller = {
  currentState: GAME_STATES.FirstCardAwaits,

  generateCards() {
    view.displayCards(utility.getRandomOrderArray(52))
  },
  assignCardAction(card) {
    if (!card.classList.contains("back")) return;
    switch (this.currentState) {
      case GAME_STATES.FirstCardAwaits:
        view.flipCard(card);
        model.tempCards.push(card);
        this.currentState = GAME_STATES.SecondCardAwaits;
        break;
      case GAME_STATES.SecondCardAwaits:
        view.flipCard(card);
        model.tempCards.push(card);
        // check match or not
        break
      case GAME_STATES.CardsMatched:
      case GAME_STATES.CardsUnmatched:
      case GAME_STATES.GameFinished:
    }
  }
}

controller.generateCards();
// add event listener to every cards
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", event => {
    controller.assignCardAction(card);
  })
})