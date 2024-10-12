/*
  RECAP
  - You can use summation in a for loop to update a todo list
  - you can generate the HTML and then pass it on to a tag for rendering
  - When creating websites with JS
    - Save the data
    - Use the data to generate HTML
    - Make it interactive
 */

/*
  Task: use localStorage to locally store the todoList items.
  - I need a place to set the items first/add them to localStorage
    - Probably will be when they are rendered OR when they are
    added to the todoList array (BOTH)
    - When adding them back into render items:

  - I need a place to get the items/ render them
    - Probably will be when they are rendered
      - Create an if statement to see if there is anything stored
      localStorage
      - if localStorage is null, continue. Else, render the values.
  - I need a place to check if there are any items in localStorage
  - I need a point where localStorage is cleared so items are not being added back over and over

  SOLUTION: 
  - All you had to do was modify the initialization of todoList.
    Basically, just take the todoList from localStorage to populate
    the global todoList, otherwise populate it with the hardcode values.
  - There was no need to modify the renderTodoList function
  - Whenever addTodo is used, the function will set localStorage and
    pass the array with the new addition, allowing todoList to be populated
    with all new items at the top of the page (conditional statement on line 36)
*/

let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes', 
  dueDate: '2022-12-22'
}];

renderTodoList();
console.log(JSON.parse(localStorage.getItem('todoList')));

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const {name, dueDate} = todoObject; 
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick= "
        todoList.splice(${i}, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList();
      " class="delete-todo-button">Delete</button>
      `; //generate the HTML
    todoListHTML += html;
  }
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

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
  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderTodoList();
}