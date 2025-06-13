document.addEventListener('DOMContentLoaded', () => {
    // Get references to our HTML elements
    const taskForm = document.getElementById('task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const tasksList = document.getElementById('tasks');

    // --- Function to Load Tasks from Local Storage ---
    // Local Storage stores data as key-value pairs, where values are strings.
    // So, we need to parse JSON strings back into JavaScript objects.
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks or an empty array if none exist
        tasks.forEach(task => addTaskToDOM(task)); // Add each loaded task to the visible list
    }

    // --- Function to Save Tasks to Local Storage ---
    // We'll get all tasks from the DOM, convert them to a simple array of objects,
    // and then stringify that array to store in Local Storage.
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- Function to Add a Task to the DOM (Display it) ---
    function addTaskToDOM(task) {
        // Create the list item element
        const listItem = document.createElement('li');
        listItem.classList.add('task-item'); // Add base class for styling

        // If the task is marked as completed, add the 'completed' class
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Create the task text span
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text; // Set the task text

        // Create a div for action buttons (delete)
        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';

        // --- Event Listeners for the New Task Item ---

        // Toggle completion status when task text is clicked
        taskText.addEventListener('click', () => {
            listItem.classList.toggle('completed'); // Add/remove 'completed' class
            saveTasks(); // Save changes to local storage
        });

        // Delete task when delete button is clicked
        deleteButton.addEventListener('click', () => {
            listItem.remove(); // Remove the entire list item from the DOM
            saveTasks(); // Save changes to local storage
        });

        // Append elements to their parents
        taskActions.appendChild(deleteButton); // Add delete button to actions div
        listItem.appendChild(taskText);       // Add task text to list item
        listItem.appendChild(taskActions);    // Add actions div to list item

        tasksList.appendChild(listItem); // Add the complete list item to the tasks ul
    }

    // --- Event Listener for Form Submission (Adding New Tasks) ---
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission (which reloads the page)

        const taskTextInput = newTaskInput.value.trim(); // Get input value and remove whitespace

        if (taskTextInput === '') {
            alert('Please enter a task!'); // Simple validation
            return; // Stop function if input is empty
        }

        // Create a new task object
        const newTask = {
            text: taskTextInput,
            completed: false // New tasks are initially not completed
        };

        addTaskToDOM(newTask); // Add the new task to the DOM
        saveTasks(); // Save the new task to local storage

        newTaskInput.value = ''; // Clear the input field after adding
    });

    // --- Initial Load ---
    // Load existing tasks from local storage when the page first loads
    loadTasks();

    console.log('Task list script loaded!');
});