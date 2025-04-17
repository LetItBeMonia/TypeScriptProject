import { v4 as uuidV4 } from 'uuid';


//creating custom type
type Task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
console.log(tasks);

form?.addEventListener("submit", e => {
    e.preventDefault()

    if (input?.value == "" || input?.value == null) return

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }

    tasks.push(newTask);
    saveTasks(); 

    addListItem(newTask);
    input.value = "";
})

function addListItem(task: Task) : void {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");


    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        console.log(tasks);
    });


    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);

}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}

// returns array of items of type Task
function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
}