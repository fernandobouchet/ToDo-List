import "./style.css";
import { format, isThisWeek, parseISO } from "date-fns";

class Todo {
  constructor(title, description, dueDate, projectName, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectName = projectName;
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
  getProjectName() {
    return this.projectName;
  }
  setTitle(newTitle) {
    this.title = newTitle;
  }
  setDescription(newDescription) {
    this.description = newDescription;
  }
  setDate(newDate) {
    this.dueDate = newDate;
  }
  setPriority(newPriority) {
    this.priority = newPriority;
  }
  setProjectName(newProjectName) {
    this.projectName = newProjectName;
  }
}

class Lists {
  constructor(name) {
    this.name = name;
    this.listContainer = [];
  }
  addTodoList(todo) {
    this.listContainer.push(todo);
  }
  removeTodoList(todo) {
    this.listContainer.splice(this.listContainer.indexOf(todo), 1);
  }
  getTodoIndex(todo) {
    return this.listContainer.indexOf(todo);
  }
  get() {
    return this.listContainer;
  }
}

const list = new Lists("Default");
const listToday = new Lists("Today");
const listWeek = new Lists("Week");

const Projects = [];

function createProject(name) {
  const project = new Lists(name);
  Projects.push(project);
  AddProjectToDocument(project);
}

const projectsListContainer = document.getElementById("project-lists-content");
const projectsContainer = document.getElementById("project-container");

function AddProjectToDocument(project) {
  const projectDiv = document.createElement("div");
  const projectNameTitle = document.createElement("h2");
  projectDiv.className = "menu-container";
  projectDiv.style.display = "none";
  projectNameTitle.textContent = project.name;

  const projectsList = document.getElementById("projects-list");
  const projectName = document.createElement("button");

  projectName.addEventListener("click", () => {
    closeMenu();
    projectsContainer.style.display = "block";
    projectDiv.style.display = "block";
    newTasButtonContainer.style.display = "block";
  });

  projectName.textContent = project.name;
  projectsList.appendChild(projectName);
  projectDiv.appendChild(projectNameTitle);
  projectsListContainer.appendChild(projectDiv);
}

const newProjectButton = document.getElementById("project-button");
const createNewProject = document.getElementById("create-new-project");
const saveNewProjectButton = document.getElementById("save-new-project-name");
const newProjectNameInput = document.getElementById("project-name");

newProjectButton.addEventListener("click", () => {
  createNewProject.style.display = "block";
});

saveNewProjectButton.addEventListener("click", () => {
  createProject(newProjectNameInput.value);
  createNewProject.style.display = "none";
});

function AddProject(projectList) {
  const filteredProject = Projects.filter((list) => list.name == projectName);
  filteredProject.forEach((list) => {
    if (!projectList.get().includes(list)) {
      projectList.addTodoList(list);
    }
  });
}

function createToDo() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const priority = document.querySelector("#priority").value;
  const projectName = document.querySelector("#project").value;
  const date = document.querySelector("#date").value;
  const newTodo = new Todo(title, description, date, priority, projectName);
  return newTodo;
}

function addListToDiv(listName, div) {
  listName.get().forEach((element) => {
    addToList(element, div);
  });
}

function removeListFromDocument(container) {
  const containerDiv = document.getElementById(container);
  const listDivs = containerDiv.querySelectorAll(".list-div");
  listDivs.forEach((element) => {
    element.remove();
  });
}

const dom = document.getElementById("home-lists-content");

function addToList(todo, div) {
  const listDiv = document.createElement("div");
  listDiv.className = "list-div";
  const title = document.createElement("h3");
  const description = document.createElement("h3");
  const date = document.createElement("h3");
  const project = document.createElement("h3");
  const priority = document.createElement("h3");
  const buttons = document.createElement("div");

  const deleteListButton = document.createElement("button");
  deleteListButton.textContent = "Delete";
  const editListButton = document.createElement("button");
  editListButton.textContent = "Edit";

  deleteListButton.addEventListener("click", () => {
    list.removeTodoList(todo);
    listToday.removeTodoList(todo);
    listWeek.removeTodoList(todo);
    refreshALlLists();
  });

  editListButton.addEventListener("click", () => {
    EditForm(todo);
  });

  title.textContent = todo.getTitle();
  description.textContent = todo.getDescription();
  date.textContent = todo.getDate();
  project.textContent = todo.getProjectName();
  priority.textContent = todo.getPriority();
  listDiv.appendChild(title);
  listDiv.appendChild(description);
  listDiv.appendChild(date);
  listDiv.appendChild(project);
  listDiv.appendChild(priority);
  buttons.appendChild(editListButton);
  buttons.appendChild(deleteListButton);
  listDiv.appendChild(buttons);
  div.appendChild(listDiv);
}

const addButton = document.getElementById("add-todo-button");

addButton.addEventListener("click", () => {
  list.addTodoList(createToDo());
  form.style.display = "none";
  removeListFromDocument("home-lists-content");
  addListToDiv(list, dom);
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
const newTasButtonContainer = document.getElementById(
  "create-task-button-container"
);
homeButton.addEventListener("click", () => {
  closeMenu();
  refreshHome();
  homeContainer.style.display = "block";
  newTasButtonContainer.style.display = "block";
});

function refreshHome() {
  removeListFromDocument("home-lists-content");
  addListToDiv(list, dom);
}

const todayButton = document.getElementById("today-button");
const todayContainer = document.getElementById("today-container");
todayButton.addEventListener("click", () => {
  closeMenu();
  addTodayList();
  newTasButtonContainer.style.display = "none";
  todayContainer.style.display = "block";
});

const todayDate = format(new Date(), "yyyy-MM-dd");
const todayList = document.getElementById("today-lists-content");

function addTodayList() {
  const filteredToday = list
    .get()
    .filter((list) => list.getDate() == todayDate);
  filteredToday.forEach((day) => {
    if (!listToday.get().includes(day)) {
      listToday.addTodoList(day);
    }
  });
  refreshToday();
}

function refreshToday() {
  removeListFromDocument("today-lists-content");
  addListToDiv(listToday, todayList);
}

const weekList = document.getElementById("week-lists-content");

function addWeekList() {
  const filteredWeek = list
    .get()
    .filter((list) => isThisWeek(parseISO(list.getDate())));
  filteredWeek.forEach((day) => {
    if (!listWeek.get().includes(day)) {
      listWeek.addTodoList(day);
    }
  });
  refreshWeek();
}

function refreshWeek() {
  removeListFromDocument("week-lists-content");
  addListToDiv(listWeek, weekList);
}

const weekButton = document.getElementById("week-button");
const weekContainer = document.getElementById("week-container");
weekButton.addEventListener("click", () => {
  closeMenu();
  addWeekList();
  newTasButtonContainer.style.display = "none";
  weekContainer.style.display = "block";
});

function EditForm(todo) {
  const editSection = document.getElementById("edit-section");
  const saveButton = document.getElementById("save-edit-button");
  const editTitle = document.querySelector("#edit-title");
  const editDescription = document.querySelector("#edit-description");
  const editProjectName = document.querySelector("#edit-project");
  const editPriority = document.querySelector("#edit-priority");
  const editDate = document.querySelector("#edit-date");
  editSection.style.display = "block";

  editTitle.value = todo.getTitle();
  editDescription.value = todo.getDescription();
  editDate.value = todo.getDate();
  editProjectName.value = todo.getProjectName();
  editPriority.value = todo.getPriority();

  saveButton.addEventListener(
    "click",
    () => {
      editSection.style.display = "none";
      todo.setTitle(editTitle.value);
      todo.setDescription(editDescription.value);
      todo.setProjectName(editProjectName.value);
      todo.setPriority(editPriority.value);
      todo.setDate(editDate.value);
      refreshALlLists();
    },
    { once: true }
  );
}

function refreshALlLists() {
  refreshHome();
  refreshToday();
  addWeekList();
}
