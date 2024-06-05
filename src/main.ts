interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todolist = document.getElementById('todo-list') as  HTMLUListElement;

let todos: Todo[] = [];
let nextId = 1 ;


// function
function addTodo(text: string ): void {
    const newTodo: Todo = {
        id: nextId++,
        text,
        completed: false
    };
    todos.push(newTodo);
    renderTodos();
}

function renderTodos(): void{
    todolist.innerHTML = '';
    todos.forEach( todo => { 
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.addEventListener('click', () => toggleTodoComplete(todo.id));
        if (todo.completed){
            li.style.textDecoration = 'line-through';
        }
        todolist.appendChild(li);
    })
}

// Function to toggle the completion status of a todo
function toggleTodoComplete(id: number): void{
    const todo = todos.find(t => t.id === id);
    if(todo){
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Event listener for the form submission
todoForm.addEventListener('submit', (event: Event) =>{
    event.preventDefault();
    const newTodoText = todoInput.value.trim();
    if(newTodoText){
        addTodo(newTodoText);
        todoInput.value = '';
    }
})