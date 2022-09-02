
const app = document.querySelector(".todos_app");
const todo_form = app.querySelector(".todoBody_form");
const todo_input = app.querySelector(".todo_input");
const todos_ul = app.querySelector(".todos_ul");

const todos_d_l = JSON.parse(localStorage.getItem("todos_d_l"));

function print(title, arguments) {
    console.log('#', title);
    console.log(arguments);
    console.log('-----------------------');
}

function appendTodoItemToView(todo_d) {
    todoText_s = todo_d.text;
    if (todoText_s) {
        const todo_li = document.createElement("li");
        todo_li.innerText = todoText_s;

        if (todo_d && todo_d.completed) {
            todo_li.classList.add("completed");
        }

        todo_li.addEventListener("click", (event) => {
            event.preventDefault();
            todo_li.classList.toggle("completed");
            updatesLS();
        });

        todo_li.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            todo_li.remove();
            updatesLS();
        });

        todo_input.value = "";
        todos_ul.appendChild(todo_li);
        updatesLS();
    }
}

function updatesLS() {
    const todos_li_l = document.querySelectorAll("li");
    const todos_d_l = [];

    todos_li_l.forEach(todo_li => {
        const todo_d = {
            text: todo_li.innerText,
            completed: todo_li.classList.contains("completed"),
        }
        todos_d_l.push(todo_d);
    });
    localStorage.setItem("todos_d_l", JSON.stringify(todos_d_l));
}

todo_form.addEventListener("submit", (event) => {
    event.preventDefault();

    let todo_d = {
        text: todo_input.value,
        completed: false
    }
    appendTodoItemToView(todo_d);
});


if (todos_d_l) {
    todos_d_l.forEach(todo_d => {
        appendTodoItemToView(todo_d)
    });
}