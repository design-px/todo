//elements
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todosListEl = document.getElementById('todos-list');
const notification = document.querySelector('.notification');

//todosArray
let todosArray = JSON.parse(localStorage.getItem("todosArray")) || [];
let editTodoId = -1;

//startup render
renderTodo();

//renderTodo 
function renderTodo() {

    //1 check to list is empty
    if (todosArray.length === 0) {
        todosListEl.innerHTML = `<center class="empty-msg"> To do list is empty<center>`;
        return
    }

    //2 clear todos list to render 
    todosListEl.innerHTML = "";

    //example to render
    /* 
    <div class="todo" id="0">
        <i class="bi bi-circle" data-action="check" style="color: ;"></i>
        <p class="" data-action="check"></p>
        <i class="bi bi-pencil-square" data-action="edit" style="color: green;"></i>
        <i class="bi bi-trash" data-action="delete" style="color: red;"></i>
    </div> 
    */
    //3 creating html elements with styles by render todo array
    todosArray.forEach((todo, index) => {
        const todoEl = document.createElement("div");
        todoEl.className = "todo";
        todoEl.id = `${index}`;

        const createEl = (tag, className, action, color, value) => {
            const el = document.createElement(tag);
            el.className = className;
            el.setAttribute("data-action", action);
            el.style.color = color;
            el.textContent = value;

            todoEl.append(el);
        }
        createEl("i", `bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}`, "check", todo.color);
        createEl("p", `${todo.checked ? 'checked' : ''}`, "check", "", todo.value);
        createEl("i", "bi bi-pencil-square", "edit", "green");
        createEl("i", "bi bi-trash", "delete", "red");

        todosListEl.append(todoEl);
    })
}

//form submit action - initiate save, render, store
form.addEventListener(('submit'), (event) => {
    event.preventDefault();

    saveTodo();
    renderTodo();

    localStorage.setItem("todosArray", JSON.stringify(todosArray))
})

//saveTodo
function saveTodo() {

    const todoValue = todoInput.value;
    const todoObj = {
        value: todoValue,
        checked: false,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    //check duplicate todo
    const isDuplicate = todosArray.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

    if (isDuplicate) {
        //confirm duplicate todo
        const addDuplicate = confirm('adding same task?');

        if (addDuplicate) {
            //adding duplicate todo to todosArray
            todosArray.push(todoObj);
        }
    } else {
        if (editTodoId >= 0) {
            todosArray = todosArray.map((todo, index) => ({
                ...todo,
                value: index === editTodoId ? todoValue : todo.value
            }))
            showNotification('task edited');

            //reset edit todo id
            editTodoId = -1;
        }
        else {
            //push todo object for html elements to todosArray
            todosArray.push(todoObj)
            showNotification('task added');
        }
    }
    //reset todo input field 
    todoInput.value = "";
}

//selecting elements of todos list and initiate check, edit, delete features
todosListEl.addEventListener(('click'), (event) => {
    //get todo and its element
    let todoChild = event.target; // element of todo
    let todoParent = todoChild.parentNode; // parent element of target

    //get element which has class name of parent is todo
    if (todoParent.className !== "todo") return;

    //get id of todo
    let todoId = Number(todoParent.id)

    //get data attribute value of element of todo
    const action = todoChild.dataset.action;

    //actions - select, edit and update, delete todo
    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
})

//action check todo
function checkTodo(todoId) {

    //change value of checked property of todo object
    todosArray = todosArray.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked
    }))

    //re-render todo
    renderTodo();

    //update stored value
    localStorage.setItem("todosArray", JSON.stringify(todosArray));
}

function deleteTodo(todoId) {

    todosArray = todosArray.filter((todo, index) => index !== todoId);

    showNotification('task deleted');

    //reset edit todo id - to prevent editing another todo if we editing current todo and deleted
    editTodoId = -1;

    //re-render - filtered array
    renderTodo();

    //update stored value
    localStorage.setItem('todosArray', JSON.stringify(todosArray))
}

function editTodo(todoId) {
    todoInput.value = todosArray[todoId].value;
    editTodoId = todoId;

    showNotification('editing task');

}

function showNotification(message) {
    notification.innerHTML = message;

    //show notification
    notification.classList.add('notify');

    //hide notification
    setTimeout(() => {
        notification.classList.remove('notify');
    }, 1500);
}