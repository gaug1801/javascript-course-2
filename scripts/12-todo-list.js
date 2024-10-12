/*
  RECAP
  - You can use summation in a for loop to update a todo list
  - you can generate the HTML and then pass it on to a tag for rendering
  - When creating websites with JS
    - Save the data
    - Use the data to generate HTML
    - Make it interactive
 */

const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes', 
  dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject; 
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `; //generate the HTML
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  /*
    Problem 1: the code to delete a todoList item was in the onclick="" attribute, which was created along with the delete button. However, to create an event listener we need the button to exist already. 
      Solution: We move all the code for deleting a todo list BELOW the creation of the todo items, after it's been passed from just a string to HTML. (line 34)

    Problem 2: the function document.querySelector() only returns the first element with the identifier passed to it. 
      Solution: document.querySelectorAll() returns an ARRAY with all the elements with the class '.js-delete-todo-button', allowing you to iterate through every button and add an event listener and the delete steps

   */

document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index) => { // deleteButton = delete button element
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    })
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    // name: name, 
    // dueDate: dueDate
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}