//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');
const tasks = document.querySelectorAll('li');

const createNewTaskElement = function (taskString) {
  const task = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');

  label.innerText = taskString;
  label.className = 'task';

  //Each element, needs appending
  checkBox.type = 'checkbox';

  task.appendChild(checkBox);
  task.appendChild(label);
  task.appendChild(createEditInput());
  task.append(createEditButton());
  task.append(createDeleteButton());
  return task;
};

const createEditInput = function () {
  const editInput = document.createElement('input');

  editInput.type = 'text';
  editInput.className = 'task';

  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  return deleteButton;
};

const addTask = function () {
  if (!taskInput.value) return;
  const task = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task);

  taskInput.value = '';
};

const editTask = function () {
  const task = this.parentNode;

  const editInput = task.querySelector('input[type=text]');
  const label = task.querySelector('label');
  const editBtn = task.querySelector('.edit');
  const containsClass = task.classList.contains('editMode');
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  task.classList.toggle('editMode');
};

const deleteTask = function () {
  const task = this.parentNode;
  const taskHolder = task.parentNode;
  taskHolder.removeChild(task);
};

const toggleTaskStatus = function () {
  const task = this.parentNode;
  const targetList = this.checked ? completedTasksHolder : incompleteTaskHolder;

  targetList.appendChild(task);
};

//The glue to hold it all together.

addButton.onclick = addTask;

const bindTaskEvents = function (task) {
  const checkBox = task.querySelector('input[type=checkbox]');
  const editButton = task.querySelector('button.edit');
  const deleteButton = task.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTaskStatus;
};

tasks.forEach((task) => {
  bindTaskEvents(task);
});

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
