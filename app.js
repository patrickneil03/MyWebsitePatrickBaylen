const apiUrl = 'https://xf25916apk.execute-api.ap-southeast-1.amazonaws.com/prod';

async function fetchTodos() {
    try {
        const response = await fetch(`${apiUrl}/todos`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const todos = await response.json();
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <input type="text" value="${todo.text}" id="todo-text-${todo.id}">
                <button onclick="updateTodo('${todo.id}')">Update</button>
                <button onclick="deleteTodo('${todo.id}')">Delete</button>
            `;
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function createTodo() {
    const text = document.getElementById('new-todo').value;
    if (!text) return;
    await fetch(`${apiUrl}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    document.getElementById('new-todo').value = '';
    fetchTodos();
}

async function updateTodo(id) {
    const text = document.getElementById(`todo-text-${id}`).value;
    await fetch(`${apiUrl}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${apiUrl}/todos/${id}`, {
        method: 'DELETE'
    });
    fetchTodos();
}

document.addEventListener('DOMContentLoaded', fetchTodos);