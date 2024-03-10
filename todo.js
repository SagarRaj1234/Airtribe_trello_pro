// Get the modal for task details
const taskDetailsModal = document.getElementById("taskDetailsModal");

// Function to open the modal for task details
function openTaskDetailsModal(task) {
    const taskTitle = task.innerText;
    const taskDescription = task.dataset.description;
    const taskStatus = task.closest(".swim-lane").id;

    document.getElementById("taskTitleDetails").value = taskTitle;
    document.getElementById("taskDescriptionDetails").value = taskDescription;
    document.getElementById("taskStatusDetails").value = taskStatus;

    taskDetailsModal.style.display = "block";
}

// Function to close the modal for task details
function closeTaskDetailsModal() {
    taskDetailsModal.style.display = "none";
}

// Updated: Added function to delete a task
function deleteTask() {
    const taskTitle = document.getElementById("taskTitleDetails").value;
    const taskStatus = document.getElementById("taskStatusDetails").value;

    const taskToDelete = document.querySelector(`#${taskStatus}-lane .task[data-description="${taskTitle}"]`);
    if (taskToDelete) {
        taskToDelete.remove();
        updateTaskCount();
        closeTaskDetailsModal();
    }
}

// Updated: Added function to update count of tasks under each status
function updateTaskCount() {
    const todoCount = document.querySelectorAll("#todo-lane .task").length;
    const doingCount = document.querySelectorAll("#doing-lane .task").length;
    const doneCount = document.querySelectorAll("#done-lane .task").length;

    document.getElementById("todo-count").innerText = `(${todoCount})`;
    document.getElementById("doing-count").innerText = `(${doingCount})`;
    document.getElementById("done-count").innerText = `(${doneCount})`;
}

// Get the form for adding a new task
const newTaskForm = document.getElementById("todo-form");

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.getElementById("todo-input").value;

    if (!value) return;

    const newTask = document.createElement("p");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    document.getElementById("todo-lane").appendChild(newTask);

    document.getElementById("todo-input").value = "";
    updateTaskCount();
});
