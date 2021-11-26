const newColorButton = document.getElementById('new-color');
const colorPalette = document.getElementById('color-palette');
const clearButton = document.getElementById('clear-board');
const generateButton = document.getElementById('generate-board');

function generateRandomColor() {
  const green = Math.round(Math.random() * 255);
  const red = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function splitRGB(rgb) {
  let rgbNumbers = rgb.replace(/rgb|[()]|,/g, '');
  rgbNumbers = rgbNumbers.split(' ');
  const red = parseInt(rgbNumbers[0], 10);
  const blue = parseInt(rgbNumbers[0], 10);
  const green = parseInt(rgbNumbers[0], 10);

  return [red, blue, green];
}

function isLightColor(rgb) {
// Source: https://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx

  let red = rgb[0];
  let blue = rgb[1];
  let green = rgb[2];

  red = red * red * 0.241;
  green = green * green * 0.691;
  blue = blue * blue * 0.068;

  const brightness = Math.sqrt(red + green + blue);

  if (brightness < 130) {
    return false;
  }
  return true;
}

function createRows(n) {
  let element;
  const board = document.getElementById('pixel-board');

  for (let count = 0; count < n; count += 1) {
    element = document.createElement('div');
    element.className = 'board-row';
    board.appendChild(element);
  }
}

function createPixels(n) {
  const rows = document.querySelectorAll('.board-row');
  let element;

  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < n; x += 1) {
      element = document.createElement('div');
      element.className = 'pixel';
      rows[y].appendChild(element);
    }
  }
}

function createBoard(n) {
  createRows(n);
  createPixels(n);
}

function deleteBoard() {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.innerHTML = '';
}

function addEventsToAllClasses(className, eventType, functionName) {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].addEventListener(eventType, functionName);
  }
}

function removeSelected() {
  const elements = document.querySelectorAll('.selected');

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.remove('selected');
  }
}

function changeSelected(event) {
  removeSelected();
  event.target.classList.add('selected');
}

function colorToPixel(event) {
  const element = event.target;
  const color = document.querySelector('.selected').style.backgroundColor;

  element.style.backgroundColor = color;
}

function clearBoard() {
  const elements = document.querySelectorAll('.pixel');

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].style.backgroundColor = 'white';
  }
}

function newBoard() {
  let number = document.getElementById('board-size').value;
  if (number === '') {
    alert('Board inválido!');
  }

  if (number < 5) {
    number = 5;
  } else if (number > 50) {
    number = 50;
  }

  deleteBoard();
  createBoard(number);
  addEventsToAllClasses('pixel', 'click', colorToPixel);
}

function newColor() {
  const element = document.createElement('div');
  const rgbColor = generateRandomColor();
  const isLight = isLightColor(splitRGB(rgbColor));

  element.className = 'color';

  if (isLight) {
    element.classList.add('light-color');
  }
  element.style.backgroundColor = rgbColor;
  element.addEventListener('click', changeSelected);

  colorPalette.insertBefore(element, newColorButton);

  if (colorPalette.children.length === 9) {
    newColorButton.remove();
  }
}

function createPallete() {
  const element = document.querySelector('.selected');
  element.style.backgroundColor = 'rgb(0, 0, 0)';
  for (let i = 0; i < 3; i += 1) {
    newColor();
  }
}

clearButton.addEventListener('click', clearBoard);
generateButton.addEventListener('click', newBoard);
newColorButton.addEventListener('click', newColor);

window.onload = () => {
  newBoard();
  createPallete();
};
