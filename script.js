const inputBox = document.querySelector('.input-box');
const tasksList = document.querySelector('.tasks-list');
const message = document.querySelector('#message');
const tasks = document.querySelector('.tasks');

function addTask() {
    if(inputBox.value === '') {
        message.textContent = 'Please enter a task';
        // alert('Please enter a task');
    }
    else {
        tasks.style.display = 'block';
        let li = document.createElement('li');
        li.textContent = inputBox.value;
        tasksList.appendChild(li);
        inputBox.value = '';
        message.textContent = '';

        let span = document.createElement('span');
        span.innerHTML = '&times;';
        span.className = 'close';
        li.appendChild(span);
    }
}

tasksList.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
    else if(e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
},false);