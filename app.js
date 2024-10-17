const taskInput = document.querySelector("#task-input");
const addBnt = document.querySelector("#task-bnt");
const taskList = document.querySelector("#task-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-bnt");

let tasks = [];

addBnt.addEventListener("click", () => {
    const taskText = taskInput.value.trim(); //รับ value จาก input
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
        };
        tasks.push(task);
        renderTasks(tasks); //function สำหรับ render input
        taskInput.value = "";
    }
    console.log(tasks);
});

const renderTasks = (tasksToRender) => {
    taskList.innerHTML = "";
    tasksToRender.forEach((task) => {
        //Create li tag
        const taskItem = document.createElement("li");
        taskList.appendChild(taskItem);
        //create li text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const bottonContainer = document.createElement("div"); //สร้าง div เพื่อเป็น section ของปุ่ม

        const editBnt = document.createElement("button");
        editBnt.textContent = "Edit";
        editBnt.addEventListener("click", () => editTask(task.id));
        bottonContainer.appendChild(editBnt);
        taskList.appendChild(bottonContainer);

        const deleteBnt = document.createElement("button");
        deleteBnt.textContent = "Delete";
        deleteBnt.addEventListener("click", () => deleteTask(task.id));
        bottonContainer.appendChild(deleteBnt);

        taskItem.appendChild(taskText);
        taskItem.appendChild(bottonContainer);

        taskText.className =
            "text-lg font-medium text-gray-900 dark:text-white";

        editBnt.className =
            "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

        deleteBnt.className =
            "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

        taskItem.className =
            "flex justify-between w-full content-center rounded-md border-2 text-center items-center py-4 px-7 h-32 my-6";
    });
};

const editTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
        const newTaskText = prompt("Edit task", task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            renderTasks(tasks);
        }
    }
};

const deleteTask = (id) => {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks(tasks);
};

searchBtn.addEventListener("click", () => {
    const searchText = searchInput.value.trim().toLowerCase();
    // Create a regular expression to search for the text
    const regex = new RegExp(searchText, "i"); // "i" flag makes it case-insensitive
    const filteredTasks = tasks.filter((task) => regex.test(task.text));

    renderTasks(filteredTasks);
});

//reset data on canvas
resetBtn.addEventListener("click", () => {
    renderTasks(tasks);
});

//รับค่าจาก input
//event ของปุ่ม
