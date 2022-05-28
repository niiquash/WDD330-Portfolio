import * as utilities from "./utilities.js";
import * as ls from "./localStorage.js";

export default class Todos {
    constructor(parentElementID, key) {
        this.parent = utilities.select(parentElementID);
        this.key = key
    }

    addTodo() {
        let taskInput = utilities.select("#addTask");
        if (taskInput.value === "") {
            alert("Enter a task to add to the list");
        }

        else {
            saveTodo(taskInput.value, "todos");
            taskInput.value = "";
        }
    }

    listTodos() {
        console.log(getTodos("todos"));
        renderTodoList(getTodos("todos"), this.parent);
        utilities.onTouch(utilities.select("#add"), this.removeTodo);
    }

    addTaskListener() {
        utilities.onTouch(utilities.select("#add"), this.addTodo);
        utilities.onTouch(utilities.select("#add"), this.listTodos);
        utilities.onTouch(utilities.select("#add"), this.completeTodo);
    }

    completeTodo() {
        let tasks = Array.from(utilities.selectAll(".taskInfo input"));
        let list = getTodos("todos");
        tasks.forEach(task => {
            task.addEventListener("click", () => {
                list.forEach(todo => {
                    tasks.forEach(task => {
                        if (todo.id == task.id) {
                            if (task.checked === true) {
                                todo.completed = true;
                                ls.writeToLocalStorage("todos", list)
                            }
                            else {
                                todo.completed = false;
                                ls.writeToLocalStorage("todos", list)
                            }
                        }
                        else {
                            console.log("hmmm")
                        }
                    })
                })
            })
        })
    }

    removeTodo() {
        let delButtons = Array.from(document.querySelectorAll(".delButton"));
        let list = getTodos("todos");
        delButtons.forEach(button => {
            button.addEventListener("click", deleteTodo)
        });

        function deleteTodo(event, name = "todos") {
            console.log(event.target.previousSibling);
            list.forEach(todo => {
                if (todo.id == event.target.previousSibling.classList) {
                    list.splice(list.indexOf(todo), 1);
                    ls.writeToLocalStorage(name, list);
                    console.log(list);
                }
                else {
                    console.log(todo.id);
                }
            })
            event.target.parentElement.remove();
        }
    }

    filterTodo() {
        let list = Array.from(utilities.selectAll(".filterBy"));
        list.forEach(item => utilities.onTouch(item, filterBy));
        list.forEach(item => utilities.onTouch(item, this.addTaskListener));
    }

}

const toDoList = [];

function saveTodo(task, key) {
    let todo = {
        id: new Date().getTime(),
        content: task,
        completed: false
    }

    if (getTodos(key) == null) {
        toDoList.push(todo);
        ls.writeToLocalStorage(key, toDoList);
        console.log("oh");
    }

    else {
        let list = getTodos(key);
        list.push(todo)
        ls.writeToLocalStorage(key, list)
    }
}

function getTodos(key) {
    if (toDoList.length === 0) {
        return ls.readFromLocalStorage(key)
    }
    else {
        return toDoList;
    }
}

function renderTodoList(list, element = utilities.select("#taskList")) {
    element.innerHTML = ``
    if (list !== null) {
        list.forEach(item => {
            let taskInfo = document.createElement("li");
            taskInfo.classList.add("taskInfo");
            if (item.completed === false) {
                taskInfo.innerHTML = `<label for="${item.id}" class="${item.id}">
                <input type="checkbox" name="status" id="${item.id}"> ${item.content}
                </label><button class="delButton">X</button>`;
                element.appendChild(taskInfo);
            }
            else {
                taskInfo.innerHTML = `<label for="${item.id}" class="${item.id}">
                <input type="checkbox" name="status" id="${item.id}" checked> ${item.content}
                </label><button class="delButton">X</button>`;
                element.appendChild(taskInfo);
            }
        });
    }
}

function filterBy(event) {
    let completedButton = utilities.select(".completed");
    let activeButton = utilities.select(".active");
    let allButton = utilities.select(".all");
    let childList = Array.from(utilities.select("#taskList").children);
    console.log(childList)
    let count = utilities.select("#count");
    let filtered = [];

    switch (event.currentTarget) {
        case activeButton:
            console.log('active');
            getTodos("todos").forEach(todo => {
                if (todo.completed === false) {
                    filtered.push(todo);
                    count.textContent = filtered.length;
                    renderTodoList(filtered, utilities.select("#taskList"));
                }
            })
            break;
        case completedButton:
            console.log('completed');
            getTodos("todos").forEach(todo => {
                if (todo.completed === true) {
                    filtered.push(todo);
                    count.textContent = filtered.length;
                    renderTodoList(filtered, utilities.select("#taskList"));
                }
            })
            break;
        case allButton:
            console.log('all');
            renderTodoList(getTodos("todos"), utilities.select("#taskList"));
            count.textContent = getTodos("todos").length;
            break;
        default:
            renderTodoList(getTodos("todos"), utilities.select("#taskList"));
            count.textContent = getTodos("todos").length;
            break;
    }
}