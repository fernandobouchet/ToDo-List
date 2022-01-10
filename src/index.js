import "./style.css";
import { format, isThisWeek, parseISO } from "date-fns";

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
  removeTodoList(todo) {
    this.listContainer.splice(this.listContainer.indexOf(todo), 1);
  }
  get() {
    return this.listContainer;
  }
}

const list = new Lists();
const listToday = new Lists();
const listWeek = new Lists();

function createToDo() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const priority = document.querySelector("#priority").value;
  const date = document.querySelector("#date").value;
  const newTodo = new Todo(title, description, date, priority);
  return newTodo;
}

function refreshList(listName, div) {
  listName.get().forEach((element) => {
    addToList(element, div);
  });
}

function removeList() {
  const listDivs = document.querySelectorAll(".list-div");
  listDivs.forEach((element) => {
    element.remove();
  });
}

const dom = document.getElementById("lists-content");

function addToList(todo, div) {
  const listDiv = document.createElement("div");
  listDiv.className = "list-div";
  const title = document.createElement("h3");
  const description = document.createElement("h3");
  const date = document.createElement("h3");
  const priority = document.createElement("h3");
  const deleteListButton = document.createElement("button");
  deleteListButton.textContent = "Delete";

  deleteListButton.addEventListener("click", () => {
    list.removeTodoList(todo);
    removeList();
    refreshList(list, div);
  });

  title.textContent = todo.getTitle();
  description.textContent = todo.getDescription();
  date.textContent = todo.getDate();
  console.log(todo.getDate());
  priority.textContent = todo.getPriority();
  listDiv.appendChild(title);
  listDiv.appendChild(description);
  listDiv.appendChild(date);
  listDiv.appendChild(priority);
  listDiv.appendChild(deleteListButton);
  div.appendChild(listDiv);
}

const addButton = document.getElementById("add-todo-button");

addButton.addEventListener("click", () => {
  list.addTodoList(createToDo());
  form.style.display = "none";
  removeList();
  refreshList(list, dom);
});

const newTaskButton = document.getElementById("new-task-button");
const form = document.getElementById("form-section");

newTaskButton.addEventListener("click", () => {
  form.style.display = "block";
});

function closeMenu() {
  const menuButtons = document.querySelectorAll(".menu-container");
  menuButtons.forEach((button) => (button.style.display = "none"));
}

const homeButton = document.getElementById("home-button");
const homeContainer = document.getElementById("home-container");
homeButton.addEventListener("click", () => {
  closeMenu();
  homeContainer.style.display = "block";
});

const todayButton = document.getElementById("today-button");
const todayContainer = document.getElementById("today-container");
todayButton.addEventListener("click", () => {
  closeMenu();
  addTodayList();
  todayContainer.style.display = "block";
});

const todayDate = format(new Date(), "yyyy-MM-dd");
const todayList = document.getElementById("today-lists-content");

function addTodayList() {
  const filteredToday = list
    .get()
    .filter((list) => list.getDate() == todayDate);
  filteredToday.forEach((day) => {
    listToday.addTodoList(day);
  });
  refreshList(listToday, todayList);
}

const weekList = document.getElementById("week-lists-content");

function addWeekList() {
  const filteredWeek = list
    .get()
    .filter((list) => isThisWeek(parseISO(list.getDate())));
  filteredWeek.forEach((day) => {
    listWeek.addTodoList(day);
  });
  refreshList(listWeek, weekList);
}

const weekButton = document.getElementById("week-button");
const weekContainer = document.getElementById("week-container");
weekButton.addEventListener("click", () => {
  closeMenu();
  addWeekList();
  weekContainer.style.display = "block";
});
