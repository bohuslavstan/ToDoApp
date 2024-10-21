const addBtn = document.getElementById("add-button");
const list = document.getElementById("list");

// Function to save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem('todos', JSON.stringify(tasks));
};

// Function to get tasks from localStorage
const getTasks = () => {
  const tasks = localStorage.getItem('todos');
  return tasks ? JSON.parse(tasks) : [];
};

// Function to render tasks from localStorage
const renderTasks = () => {
  const tasks = getTasks();
  list.innerHTML = ''; // Clear current list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    const delBtn = document.createElement("button");

    li.className = "list-item";
    text.textContent = task.text;
    if (task.completed) {
      li.classList.add("crossed");
    }

    // Toggle cross-out on click
    text.addEventListener("click", () => {
      li.classList.toggle("crossed");
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks); // Update localStorage
    });

    // Delete button
    delBtn.className = "delete-button";
    delBtn.innerHTML = `<img class="delete-button-img" src="./src/img/delete-button-svgrepo-com.svg" alt="delete button">`;

    // Delete task on click
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1); // Remove task from array
      saveTasks(tasks); // Update localStorage
      renderTasks(); // Re-render the list
    });

    li.appendChild(text);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
};

// Add a new task
const addNewTodo = () => {
  const input = document.getElementById("input");
  const tasks = getTasks();

  if (input.value.trim()) {
    tasks.push({
      text: input.value,
      completed: false,
    });
    saveTasks(tasks); // Save the new task to localStorage
    renderTasks(); // Re-render the list
  }

  input.value = ""; // Clear the input field
};

// Event listener for the add button
addBtn.addEventListener("click", addNewTodo);

// Load tasks from localStorage when the page loads
window.addEventListener('load', renderTasks);
