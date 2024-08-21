document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load existing todos from localStorage
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToList(todo));
    };

    // Save todos to localStorage
    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Add todo to the list
    const addTodoToList = (todo) => {
        const li = document.createElement('li');
        li.className = 'list-group-item todo-item';
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <input type="checkbox" class="mr-2" ${todo.completed ? 'checked' : ''}>
                <span ${todo.completed ? 'style="text-decoration: line-through;"' : ''}>${todo.text}</span>
            </div>
            <div>
                <button class="btn btn-warning btn-sm mr-2 edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </div>
        `;
        todoList.appendChild(li);

        // Edit button
        li.querySelector('.edit-btn').addEventListener('click', () => {
            Swal.fire({
                title: 'Edit Task',
                input: 'text',
                inputValue: todo.text,
                showCancelButton: true,
                confirmButtonText: 'Updated',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!';
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    todo.text = result.value;
                    li.querySelector('span').textContent = todo.text;
                    saveTodos(getTodosFromList());
                }
            });
        });

        // Delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "The will be removed permanently",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    li.remove();
                    saveTodos(getTodosFromList());
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    );
                }
            });
        });

        // Checkbox
        li.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
            todo.completed = e.target.checked;
            li.querySelector('span').style.textDecoration = todo.completed ? 'line-through' : 'none';
            saveTodos(getTodosFromList());
        });
    };

    // Get todos from the list
    const getTodosFromList = () => {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('input[type="checkbox"]').checked
            });
        });
        return todos;
    };

    // Handle form submission
    form.addEventListener('Enter', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            const todo = { text, completed: false };
            addTodoToList(todo);
            input.value = '';
            saveTodos(getTodosFromList());
        }
    });

    // Initial load
    loadTodos();
});
