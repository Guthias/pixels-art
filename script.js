const newColorButton = document.getElementById('new-color');
const colorPalette = document.getElementById('color-palette');

function generateRandomColor() {
  const green = Math.round(Math.random() * 255);
  const red = Math.round(Math.random() * 255);
  const blue = Math.round(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function randomColor() {
  const elements = document.querySelectorAll('.color');
  for (let i = 0; i < elements.length; i += 1) {
    if (i === 0) {
      elements[i].style.backgroundColor = 'rgb(0, 0, 0)';
    } else {
      elements[i].style.backgroundColor = generateRandomColor();
    }
  }
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
  element.className = 'color';
  element.style.backgroundColor = generateRandomColor();
  element.addEventListener('click', changeSelected);
  colorPalette.insertBefore(element, newColorButton);

  if (colorPalette.children.length === 9) {
    newColorButton.remove();
  }
}

createBoard(5);
addEventsToAllClasses('color', 'click', changeSelected);
addEventsToAllClasses('pixel', 'click', colorToPixel);
randomColor();

const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', clearBoard);

const generateButton = document.getElementById('generate-board');

generateButton.addEventListener('click', newBoard);
newColorButton.addEventListener('click', newColor);
