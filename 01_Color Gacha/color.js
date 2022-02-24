const btn = document.getElementById("colorbtn");
const rgb = document.getElementById("colorrgb");
const hex = document.getElementById("colorhex");
const board = document.getElementById("color-main");

const hexdeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

btn.addEventListener("click", () => {
  let hexcode = "#";
  for (let i = 0; i < 6; i++) {
    hexcode += hexdeck[Math.floor(Math.random() * 16)];
  }
  const r = hexcode.substring(1, 3);
  const g = hexcode.substring(3, 5);
  const b = hexcode.substring(5, 7);
  let rgbcode = `(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`
  hex.textContent = hexcode;
  rgb.textContent = rgbcode;
  board.style.backgroundColor = hexcode;
})

