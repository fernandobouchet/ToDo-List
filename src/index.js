import "./style.css";

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getDate() {
    return this.dueDate;
  }
  getPriority() {
    return this.priority;
  }
}

class Lists {
  listContainer = [];

  addTodoList(todo) {
    this.listContainer.push(todo);
  }
  get() {
    return this.listContainer;
  }
}

const list = new Lists();

function createToDo() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const priority = document.querySelector("#priority").value;
  const date = document.querySelector("#date").value;
  const newTodo = new Todo(title, description, date, priority);
  return newTodo;
}

function refreshList() {
  removeList();
  list.get().forEach((element) => {
    addToList(element);
  });
}

function removeList() {
  const listDivs = document.querySelectorAll(".list-div");
  listDivs.forEach((element) => {
    element.remove();
  });
}

const dom = document.getElementById("lists-content");

function addToList(todo) {
  const listDiv = document.createElement("div");
  listDiv.className = "list-div";
  const title = document.createElement("h3");
  const description = document.createElement("h3");
  const date = document.createElement("h3");
  const priority = document.createElement("h3");
  title.textContent = todo.getTitle();
  description.textContent = todo.getDescription();
  date.textContent = todo.getDate();
  priority.textContent = todo.getPriority();
  listDiv.appendChild(title);
  listDiv.appendChild(description);
  listDiv.appendChild(date);
  listDiv.appendChild(priority);
  dom.appendChild(listDiv);
}

const addButton = document.getElementById("add-todo-button");

addButton.addEventListener("click", () => {
  list.addTodoList(createToDo());
  form.style.display = "none";
  refreshList();
});

const newTaskButton = document.getElementById("new-task-button");
const form = document.getElementById("form-section");

newTaskButton.addEventListener("click", () => {
  form.style.display = "block";
});
