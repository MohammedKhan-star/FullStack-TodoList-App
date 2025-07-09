document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Fetch and display todos
    const fetchTodos = async () => {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            li.dataset.id = todo.id;
            li.classList.toggle('completed', todo.completed);
            li.addEventListener('click', toggleTodo);
            todoList.appendChild(li);
        });
    };

    // Add a new todo
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = todoInput.value.trim();
        if (title) {
            await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            todoInput.value = '';
            fetchTodos();
        }
    });

    // Toggle todo completion
    const toggleTodo = async (e) => {
        const todoId = e.target.dataset.id;
        await fetch(`/api/todos/${todoId}/toggle`, {
            method: 'PATCH',
        });
        fetchTodos();
    };

    // Initial fetch of todos
    fetchTodos();
});