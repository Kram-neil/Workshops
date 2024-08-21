//  render a single task
function renderTask(taskText, taskId, completed = false) {
    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    li.id = taskId;
    li.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''} onclick="toggleComplete('${taskId}')">
        <span>${taskText}</span>
        <button class="edit" onclick="editTask('${taskId}')">Update</button>
        <button class="delete" onclick="deleteTask('${taskId}')">Delete</button>
    `;
    
    taskList.appendChild(li);
}

// add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskId = Date.now().toString();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, id: taskId });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask(taskText, taskId);
    taskInput.value = '';
}

//  remove a task
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const taskList = document.getElementById('taskList');
    const taskItem = document.getElementById(taskId);
    taskList.removeChild(taskItem);
}

// edit a task
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);
    
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText === null || newTaskText.trim() === '') return;

    task.text = newTaskText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskItem = document.getElementById(taskId);
    taskItem.querySelector('span').textContent = task.text;
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);
