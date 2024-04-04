document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoDatetime = document.getElementById('todo-datetime');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskText = todoInput.value.trim();
      const taskDatetime = todoDatetime.value;
      if (taskText !== '' && taskDatetime !== '') {
        addTask(taskText, taskDatetime);
        todoInput.value = '';
        todoDatetime.value = '';
      }
    });

    function addTask(taskText, taskDatetime) {
      const li = document.createElement('li');
      const date = new Date(taskDatetime).toLocaleString();
      li.innerHTML = `
        <div class="textconainter">
          <input type="checkbox" class="complete-checkbox">
        <div>${taskText}</div>
          </div>
        <div class="edit-action">
          <span class="time">${date}</span>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
    }

    todoList.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('delete-btn')) {
        const li = target.closest('li');
        li.remove();
      } else if (target.classList.contains('edit-btn')) {
        const taskText = target.closest('li').querySelector('div:nth-child(2)').textContent;
        const newTaskText = prompt('Edit task:', taskText);
        if (newTaskText !== null) {
          target.closest('li').querySelector('div:nth-child(2)').textContent = newTaskText;
        }
      } else if (target.classList.contains('complete-checkbox')) {
        const taskDiv = target.nextElementSibling;
        if (target.checked) {
          taskDiv.innerHTML = taskDiv.textContent + ' - Task Completed';
          // Disable edit button
        
          target.parentElement.nextElementSibling.querySelector('.edit-btn').disabled = true;
          target.parentElement.nextElementSibling.querySelector('.edit-btn').style.pointerEvents = 'none';
        } else {
          taskDiv.innerHTML = taskDiv.textContent.replace(' - Task Completed', '');
          // Enable edit button
          target.parentElement.nextElementSibling.querySelector('.edit-btn').disabled = false;
          target.parentElement.nextElementSibling.querySelector('.edit-btn').style.pointerEvents = 'auto';
        }
      }
    });
  });