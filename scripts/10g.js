function toggleButton(selector) {
  const buttonElem = document.querySelector(selector);

  if (!buttonElem.classList.contains('is-toggled')) {
    turnOffPreviousButton();
    buttonElem.classList.add('is-toggled');
  } else {
    buttonElem.classList.remove('is-toggled');
  }
}

function turnOffPreviousButton() {
  const previousButton = document.querySelector('.is-toggled');

  if (previousButton) {
    previousButton.classList.remove('is-toggled');
  }
}
/*
  Lesson here:
    - You didn't remember that .querySelector can find an HTML tag through a class, id, or simple tag attribute(button). You DON'T have to use .classList.contains('class-name')!!!
    - You can pass the class name of an HTML tag as a string in the function call and use that to select the button you want to work with. Ex. const buttonElem = document.querySelector(selector); selector being the string, "js-button-1" for example.
    - turnOffPreviousButton is solid. What you didn't think about is the use of truthy/falsy to determine if it even exists. Genius. Just check if it exists and if it doesn't do nothing.
*/