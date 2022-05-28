import * as utilities from "./utilities.js";
import * as ls from "./localStorage.js";

export default class Todos {
    constructor(parentID, key) {
        this._parent = utilities.select(parentID);
        this._key = key;
    }

    addTodo() {
        const that = this;
        const addButton = utilities.select("#add");
        utilities.onTouch(addButton, () => {
            let taskInput = utilities.select("#addTask");
            if (taskInput.value === "") {
                alert("Enter a task to add to the list");
            }
            else {
                saveTodo(taskInput.value, that._key);
                taskInput.value = "";
            }
            that.listTodos(that._key);
        })
    }

    listTodos(key = this._key) {
        renderTodoList(getTodos(key), this._parent);
        const childList = Array.from(utilities.select("#taskList").children);
        let counter = utilities.select("#count");
        let count = childList.length;
        counter.innerHTML = count;
        this.removeTodo();
        this.completeTodo();
        this.filterTodo();
    }

    addTaskListener() {

    }

    removeTodo(key = this._key) {
        const that = this;
        let delButtons = Array.from(document.querySelectorAll(".delButton"));
        let list = getTodos(key);
        delButtons.forEach(button => {
            utilities.onTouch(button, deleteTodo)
        });

        function deleteTodo(event) {
            list.forEach(todo => {
                if (todo.id == event.target.previousSibling.classList) {
                    list.splice(list.indexOf(todo), 1);
                    ls.writeToLocalStorage(key, list);
                    that.listTodos(key);
                }
            })
        }
    }

    completeTodo(key = this._key) {
        let tasks = Array.from(utilities.selectAll(".taskInfo input"));
        let list = getTodos(key);
        tasks.map(task => {
            utilities.onTouch(task, updateStatus);
        })

        function updateStatus(event) {
            list.map(todo => {
                if (todo.id == event.currentTarget.id) {
                    if (event.currentTarget.checked === true) {
                        todo.completed = true;
                        ls.writeToLocalStorage(key, list);
                    }
                    else {
                        todo.completed = false;
                        ls.writeToLocalStorage(key, list)
                    }
                }
            })
        }
    }

    filterTodo() {
        const filterButton = Array.from(utilities.selectAll(".filterBy"));
        const childList = Array.from(utilities.select("#taskList").children);
        let completedButton = utilities.select(".completed");
        let activeButton = utilities.select(".active");
        let allButton = utilities.select(".all");

        utilities.onTouch(completedButton, () => {
            filterButton.map(button => button.classList.remove("selected"));
            completedButton.classList.add("selected");
            let counter = utilities.select("#count");
            let count = childList.length;
            childList.map(task => {
                task.classList.remove("hidden");
                if (task.firstElementChild.firstElementChild.checked === false) {
                    task.classList.add("hidden");
                    count -= 1;
                }
            })
            counter.innerHTML = count;
        })

        utilities.onTouch(activeButton, () => {
            filterButton.map(button => button.classList.remove("selected"));
            activeButton.classList.add("selected");
            let counter = utilities.select("#count");
            let count = childList.length;
            childList.map(task => {
                task.classList.remove("hidden");
                if (task.firstElementChild.firstElementChild.checked === true) {
                    task.classList.add("hidden");
                    count -= 1;
                }
            })
            counter.innerHTML = count;
        })

        utilities.onTouch(allButton, () => {
            filterButton.map(button => button.classList.remove("selected"));
            allButton.classList.add("selected");
            let counter = utilities.select("#count");
            let count = childList.length;
            childList.map(task => {
                task.classList.remove("hidden");
            })
            counter.innerHTML = count;
        })
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