// Access all the elements we require from DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

//eventlistener  which will add the task to taskList on click of addTaskButton button
addTaskButton.addEventListener('click', addTask);
//eventlistener  which will add the task to taskList on when enter key is pressed inside the input field
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

//function to add the task to tasklist 
function addTask() {
    //perform check Input field value contain non-empty string
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    //creating list item element 
    // checkbox is added which will indicate task is completed or not status
    //delete button will remove the task from taskList.
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.id='task_status';
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTaskCompletion);

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(span);

    li.appendChild(checkboxContainer);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    //reset the value of input field
    taskInput.value = '';
   //update the task count
    updateTaskCount();
}

//delete the task from task list
//it will find the closed parent of delete button which is 'li' element and remove it from task list
function deleteTask(event) {
    const li = event.target.closest('li');
    taskList.removeChild(li);
    updateTaskCount();
}

//function to mark task as completed it will change class if list item
// toggled class will change style of the element which will represent task is completed
function toggleTaskCompletion(event) {
    const li = event.target.closest('li');
    li.classList.toggle('completed');
}

// this function will calculate count of task in task bar and update the count
function updateTaskCount() {
    const totalTasks = taskList.children.length;
    taskCount.textContent = `Total tasks: ${totalTasks}`;
}
