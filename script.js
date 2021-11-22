function generateRandomColor() {
  const green = Math.floor(Math.random() * 255);
  const red = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

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

createBoard(5);
addEventsToAllClasses('color', 'click', changeSelected);
addEventsToAllClasses('pixel', 'click', colorToPixel);
randomColor();
