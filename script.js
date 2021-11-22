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

addEventsToAllClasses('color', 'click', changeSelected);
addEventsToAllClasses('pixel', 'click', colorToPixel);
randomColor();
