// Load tasks from localStorage on page load
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // DOM Elements
        const taskForm = document.getElementById('taskForm');
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const taskCounter = document.getElementById('taskCounter');
        const alertContainer = document.getElementById('alertContainer');

        // Update task counter
        function updateCounter() {
            taskCounter.textContent = `Total Tasks: ${tasks.length}`;
        }

        // Show Bootstrap alert
        function showAlert(message, type = 'success') {
            const alert = document.createElement('div');
            alert.className = `alert alert-${type} alert-dismissible fade show`;
            alert.role = 'alert';
            alert.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            alertContainer.appendChild(alert);
            setTimeout(() => alert.remove(), 3000);
        }

        // Save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateCounter();
        }

        // Render tasks
        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <span style="${task.completed ? 'text-decoration: line-through;' : ''}">
                        ${task.text}
                    </span>
                    <div>
                        <button class="btn btn-sm btn-success me-2" onclick="toggleComplete(${index})">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
            saveTasks();
        }

        // Add task
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskText = taskInput.value.trim();
            if (!taskText) {
                showAlert('Please enter a task!', 'danger');
                return;
            }
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
            showAlert('Task added successfully!');
        });

        // Toggle task completion
        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            showAlert('Task status updated!');
        }

        // Delete task
        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
            showAlert('Task deleted!', 'warning');
        }

        // Initial render
        renderTasks();
