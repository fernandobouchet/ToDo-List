import "./style.css";

class Todo {
  constructor(title, description, dueDate, priority, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }
  show() {
    return `Title: ${this.title}, Description: ${this.description}, Date: ${this.dueDate}, Priority: ${this.priority}`;
  }
}

class Lists {
  constructor(todoList) {
    this.todoList = todoList;
  }
  listContainer = [];

  addTodoList(todo) {
    this.listContainer.push(todo);
  }
  getList() {
    return this.listContainer;
  }
}

const list = new Lists();

function createToDo() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const priority = document.querySelector("#priority").value;
  const date = document.querySelector("#date").value;
  const check = document.getElementById("check").checked;
  const newTodo = new Todo(title, description, date, priority, check);
  return newTodo;
}

function refreshList() {
  removeList();
  list.listContainer.forEach((element) => {
    addToList(element);
  });
}

function removeList() {
  const listDivs = document.querySelectorAll(".list-div");
  listDivs.forEach((element) => {
    element.remove();
  });
}

const dom = document.getElementById("content-div");

function addToList(todo) {
  const listDiv = document.createElement("div");
  listDiv.className = "list-div";
  listDiv.textContent = todo.show();
  dom.appendChild(listDiv);
}

const addButton = document.getElementById("add-todo-button");

addButton.addEventListener("click", () => {
  list.addTodoList(createToDo());
  refreshList();
});
