const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const editCancelBtn = document.getElementById("editCancelBtn");
const editSaveBtn = document.getElementById("editSaveBtn");

const counterEl = document.getElementById("counter");

const clearDoneBtn = document.getElementById("clearDoneBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let taskToDelete = null;
let taskToDeleteElement = null;

let taskToEdit = null;

let currentFilter = "all";

//FILTER BUTTONS
document.getElementById("allBtn").addEventListener("click", function () {
  currentFilter = "all";
  renderTasks();
});

document.getElementById("activeBtn").addEventListener("click", function () {
  currentFilter = "active";
  renderTasks();
});

document.getElementById("doneBtn").addEventListener("click", function () {
  currentFilter = "done";
  renderTasks();
});

//CLEAR DONE TASKS
clearDoneBtn.addEventListener("click", function () {
  tasks = tasks.filter((t) => t.done === false);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
});

function createTask(task) {
  const li = document.createElement("li");

  li.className =
    "flex justify-between items-center bg-gray-100 p-2 rounded mb-2";

  const textSpan = document.createElement("span");
  textSpan.textContent = task.text;

  if (task.done) {
    textSpan.style.textDecoration = "line-through";
  }

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔️";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";

  //DONE BUTTON
  doneBtn.addEventListener("click", function () {
    task.done = !task.done;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
  });

  //EDIT BUTTON
  editBtn.addEventListener("click", function () {
    editModal.classList.remove("hidden");

    editInput.value = task.text;

    taskToEdit = task;
  });

  //DELETE BUTTON
  deleteBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
    taskToDelete = task;
    taskToDeleteElement = li;
  });

  const btnGroup = document.createElement("div");

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(doneBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(textSpan);
  li.appendChild(btnGroup);
  list.appendChild(li);
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

renderTasks();

function renderTasks() {
  list.innerHTML = "";

  if(tasks.length === 0){
    list.innerHTML = "<p class='text-gray-400'>No tasks yet</p>";
  }

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter((t) => t.done === false);
  } else if (currentFilter === "done") {
    filteredTasks = tasks.filter((t) => t.done);
  }

  filteredTasks.forEach(createTask);

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;

  counterEl.textContent = `${done} / ${total} completed`;

  if (done === 0){
    clearDoneBtn.disabled = true;
    clearDoneBtn.classList.add("opacity-50", "cursor-not-allowed");
  }else{
    clearDoneBtn.disabled = false;
    clearDoneBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
}

//ADD TASK
button.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (!taskText) return;

  if (tasks.some(t => t.text === taskText)) return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();

  input.value = "";
  input.focus();
});

//DELERE MODAL CONTROLS
cancelBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
  taskToDelete = null;
});

confirmBtn.addEventListener("click", function () {
  if (!taskToDelete) return;
  tasks = tasks.filter((t) => t.id !== taskToDelete.id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();

  modal.classList.add("hidden");
});

//EDIT MODAL CONTROLS

editSaveBtn.addEventListener("click", function () {
  if (!taskToEdit) return;

  const newText = editInput.value.trim();

  if (!newText) return;

  taskToEdit.text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  editModal.classList.add("hidden");

  taskToEdit = null;
  renderTasks();
});

editCancelBtn.addEventListener("click", function () {
  editModal.classList.add("hidden");
  taskToEdit = null;
  taskToEditElement = null;
});
