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

addEventsToAllClasses('color', 'click', changeSelected);
