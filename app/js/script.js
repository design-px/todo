//elements
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todosListEl = document.getElementById('todos-list');
const notification = document.querySelector('.notification');

//todoArray
const todosArray = JSON.stringify(localStorage.getItem("todosArray")) || [];
let editTodoId = -1;

//startup render
renderTodo();

//renderTodo 
function renderTodo() {

    //1 check to list is empty
    if (todosArray.length === 0) {
        todosListEl.innerHTML = `<center> To do list is empty<center>`;
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
    todosArray.forEach((todo) => {
        const todoEl = document.createElement("div");
        const iEl_1 = document.createElement("i");
        const pEl = document.createElement("p");
        const iEl_2 = document.createElement("i");
        const iEl_3 = document.createElement("i");

        todoEl.className = "todo";
        todoEl.id = `${index}`;

        iEl_1.className = `bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}`;
        iEl_1.setAttribute("data-action", "check");
        iEl_1.style.color = todo.color;

        pEl.className = `${todo.checked ? 'checked' : ''}`;
        pEl.setAttribute("data-action", "check");
        pEl.textContent = todo.value;

        iEl_2.className = `bi bi-pencil-square`;
        iEl_2.setAttribute("data-action", "edit");
        iEl_2.style.color = "green";

        iEl_3.className = `bi bi-trash`;
        iEl_3.setAttribute("data-action", "delete");
        iEl_3.style.color = "red";


        todoEl.append(iEl_1);
        todoEl.append(pEl);
        todoEl.append(iEl_2);
        todoEl.append(iEl_3);

        todosListEl.append(todoEl);
    })
}