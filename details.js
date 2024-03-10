// Function to update count of tasks under each status
function updateTaskCount() {
    const todoCount = document.querySelectorAll("#todo-lane .task").length;
    const doingCount = document.querySelectorAll("#doing-lane .task").length;
    const doneCount = document.querySelectorAll("#done-lane .task").length;

    document.getElementById("todo-count").innerText = `(${todoCount})`;
    document.getElementById("doing-count").innerText = `(${doingCount})`;
    document.getElementById("done-count").innerText = `(${doneCount})`;
}

// Function to handle drag and drop
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
        updateTaskCount(); // Updated: Added call to update count after drag and drop
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};
