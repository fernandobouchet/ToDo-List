import "./style.css";
import { format, isThisWeek, parseISO } from "date-fns";

class Todo {
  constructor(title, description, dueDate, priority, projectName) {
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
const defaultList = new Lists("Default");

const Projects = [];

function createProject(name) {
  const project = new Lists(name);
  Projects.push(project);
  AddProjectToDocument(project);
}

const projectsListContainer = document.getElementById("projects-lists-content");
const projectsContainer = document.getElementById("projects-container");

Projects.push(defaultList);
AddProjectToDocument(defaultList);

function AddProjectToDocument(project) {
  const projectDiv = document.createElement("div");
  projectDiv.className = "menu-container";
  projectDiv.style.display = "none";

  const projectsList = document.getElementById("projects-list");
  const projectName = document.createElement("button");

  projectName.addEventListener("click", () => {
    clearList(project);
    addProject(project);
    closeMenu();
    projectsContainer.style.display = "block";
    projectDiv.style.display = "block";
    newTaskButtonContainer.style.display = "block";
  });

  projectName.textContent = project.name;
  projectsList.appendChild(projectName);
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

function addProject(project) {
  const filteredProject = list
    .get()
    .filter((list) => list.getProjectName() == project.name);
  filteredProject.forEach((list) => {
    if (!project.get().includes(list)) {
      project.addTodoList(list);
    }
  });
  updateProjectsSelect(project);
  removeListFromDocument("projects-lists-content");
  addListToDiv(project, projectsListContainer);
}

function refreshProjects() {
  Projects.forEach((project) => clearList(project));
  Projects.forEach((project) => addProject(project));
}

function updateProjectsSelect(project) {
  const select = document.getElementById("project");
  const selectEdit = document.getElementById("edit-project");
  const projectName = document.createElement("option");
  const editProjectName = document.createElement("option");
  const options = [...selectEdit.options].map((option) => option.value);

  if (!options.includes(project.name)) {
    projectName.value = project.name;
    projectName.textContent = project.name;
    editProjectName.value = project.name;
    editProjectName.textContent = project.name;
    selectEdit.appendChild(editProjectName);
    select.appendChild(projectName);
  }
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

const cancelTodoButton = document.getElementById("cancel-todo-button");
const cancelEditButton = document.getElementById("cancel-edit-button");

cancelTodoButton.addEventListener("click", () => {
  closeTodo();
});

function closeTodo() {
  form.style.display = "none";
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#priority").value = "Normal";
  document.querySelector("#project").value = "Default";
  document.querySelector("#date").value = todayDate;
}

cancelEditButton.addEventListener("click", () => {
  closeEdit();
});

function closeEdit() {
  editSection.style.display = "none";
  document.querySelector("#edit-title").value = "";
  document.querySelector("#edit-description").value = "";
  document.querySelector("#edit-priority").value = "Normal";
  document.querySelector("#edit-project").value = "Default";
  document.querySelector("#edit-date").value = todayDate;
}

const addButton = document.getElementById("add-todo-button");

addButton.addEventListener("click", () => {
  list.addTodoList(createToDo());
  closeTodo();
  refreshHome();
  refreshProjects();
});

const newTaskButton = document.getElementById("new-task-button");
const form = document.getElementById("form-section");

newTaskButton.addEventListener("click", () => {
  closeTodo();
  form.style.display = "block";
});

function closeMenu() {
  const menuButtons = document.querySelectorAll(".menu-container");
  menuButtons.forEach((button) => (button.style.display = "none"));
}

const homeButton = document.getElementById("home-button");
const homeContainer = document.getElementById("home-container");
const newTaskButtonContainer = document.getElementById(
  "create-task-button-container"
);
homeButton.addEventListener("click", () => {
  closeMenu();
  refreshHome();
  homeContainer.style.display = "block";
  newTaskButtonContainer.style.display = "block";
});

function refreshHome() {
  removeListFromDocument("home-lists-content");
  addListToDiv(list, dom);
}

const todayButton = document.getElementById("today-button");
const todayContainer = document.getElementById("today-container");
todayButton.addEventListener("click", () => {
  clearList(listToday);
  addTodayList();
  closeMenu();
  newTaskButtonContainer.style.display = "none";
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
  removeListFromDocument("today-lists-content");
  addListToDiv(listToday, todayList);
}

function refreshToday() {
  clearList(listToday);
  addTodayList();
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
  removeListFromDocument("week-lists-content");
  addListToDiv(listWeek, weekList);
}

function refreshWeek() {
  clearList(listWeek);
  addWeekList();
  removeListFromDocument("week-lists-content");
  addListToDiv(listWeek, weekList);
}

const weekButton = document.getElementById("week-button");
const weekContainer = document.getElementById("week-container");
weekButton.addEventListener("click", () => {
  clearList(listWeek);
  addWeekList();
  closeMenu();
  newTaskButtonContainer.style.display = "none";
  weekContainer.style.display = "block";
});

const editSection = document.getElementById("edit-section");

function EditForm(todo) {
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
      todo.setTitle(editTitle.value);
      todo.setDescription(editDescription.value);
      todo.setProjectName(editProjectName.value);
      todo.setPriority(editPriority.value);
      todo.setDate(editDate.value);
      closeEdit();
      refreshALlLists();
    },
    { once: true }
  );
}

function refreshALlLists() {
  refreshHome();
  refreshToday();
  refreshWeek();
  refreshProjects();
}

function clearList(listToReset) {
  while (listToReset.get().length > 0) {
    listToReset.get().pop();
  }
}
