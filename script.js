window.onload = function() {
    loadTasksFromLocalStorage();
};
function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const tasksList = document.getElementById("tasks");
    const newTask = document.createElement("li");
    newTask.innerHTML = `<label><input type="checkbox" onchange="updateTaskStatus(this)">${taskText}</label><button onclick='removeTask(this)'>Remove</button>`;
    tasksList.appendChild(newTask);

    saveTasksToLocalStorage();

    taskInput.value = "";
}
function removeTask(removeButton) {
    const taskElement = removeButton.parentElement;
    taskElement.remove();
    saveTasksToLocalStorage();
}
function updateTaskStatus(checkbox) {
    saveTasksToLocalStorage();
}
function saveTasksToLocalStorage() {
    const tasksList = document.getElementById("tasks");
    const tasks = [];
    for (let i = 0; i < tasksList.children.length; i++) {
        const taskText = tasksList.children[i].querySelector("label").textContent;
        const isCompleted = tasksList.children[i].querySelector("input[type='checkbox']").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
    const tasksList = document.getElementById("tasks");
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const newTask = document.createElement("li");
            newTask.innerHTML = `<label><input type="checkbox"${task.completed ? " checked" : ""} onchange="updateTaskStatus(this)">${task.text}</label><button onclick='removeTask(this)'>Remove</button>`;
            tasksList.appendChild(newTask);
        });
    }
}
