const utility = {
  newDeck() {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const symbols = ["/02_Memory Match/Clubs.png", "/02_Memory Match/Diamonds.png", "/02_Memory Match/Hearts.png", "/02_Memory Match/Spades.png"];
    const deck = [];
    for (let i = 0; i < symbols.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        deck.push({ num: numbers[j], symbol: symbols[i] })
      }
    }
    return deck;
  }
}
const view = {
  displayCards() {
    const board = document.getElementById("cards");
    board.innerHTML = this.getCardElement(40);
  },
  getCardElement(index) {
    const deck = utility.newDeck();
    return `
    <div class="card d-flex flex-column justify-content-around">
      <p>${deck[index].num}</p>
      <img src="${deck[index].symbol}" alt="">
      <p>${deck[index].num}</p>
    </div>`
  }
}
view.displayCards();