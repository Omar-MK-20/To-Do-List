const inputBox = document.querySelector('.input-box');
const tasksList = document.querySelector('.tasks-list');
const message = document.querySelector('#message');
const tasks = document.querySelector('.tasks');

let usernameElement = document.querySelector('#user-name-elemnt');
let newUsername = document.querySelector('#userName');

const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const formContainer = document.getElementById("formContainer");
const signInForm = document.querySelector("form");

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;


// function to load user's tasks
function loadTasks() {
    tasksList.innerHTML = '';
    if (currentUser) {
        let user = users.find(u => u.username === currentUser);
        if (user && user.tasks.length > 0) {
            tasks.style.display = 'block';
            user.tasks.forEach(task => {
                let li = document.createElement('li');
                li.textContent = task[0];
                if (task[1]) li.classList.add('checked'); // Add checked class if task is completed

                let span = document.createElement('span');
                span.innerHTML = '&times;';
                span.className = 'close';
                li.appendChild(span);

                tasksList.appendChild(li);
            });
        }
    }
}

// function to add a new task 
function addTask() {
    if (!currentUser) {
        alert('please login to add a task');
        return;
    }
    if (inputBox.value.trim() === '') {
        message.textContent = 'Please enter a task';
        return;
    }

    let user = users.find(u => u.username === currentUser);
    if (user) {
        let newTask = [inputBox.value.trim(), false];
        user.tasks.push(newTask);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    tasks.style.display = 'block';
    
    let li = document.createElement('li');
    li.textContent = inputBox.value.trim();

    let span = document.createElement('span');
    span.innerHTML = '&times;';
    span.className = 'close';
    li.appendChild(span);

    tasksList.appendChild(li);
    inputBox.value = '';
    message.textContent = '';
}

// event listener for task clicks (toggle and delete)
tasksList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        let user = users.find(u => u.username === currentUser);
        if (user) {
            let taskText = e.target.textContent.slice(0, -1);
            let task = user.tasks.find(t => t[0] === taskText);
            if (task) {
                var isCompleted = (task[1] === true) ? true : false;
                task[1] = !isCompleted; // Toggle the completed status
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
        // console.log(localStorage.getItem("users"));
    } 
    else if (e.target.tagName === 'SPAN') {
        let taskText = e.target.parentElement.textContent.slice(0, -1);
        let user = users.find(u => u.username === currentUser);
        if (user) {
            user.tasks = user.tasks.filter(task => task[0] !== taskText);
            localStorage.setItem("users", JSON.stringify(users));
        }
        e.target.parentElement.remove();
    }
}, false);

// handel login form
document.addEventListener("DOMContentLoaded", function() {
    // Open form
    openFormBtn.addEventListener("click", function() {
        formContainer.classList.add("show");
    });

    // Close form
    closeFormBtn.addEventListener("click", function() {
        formContainer.classList.remove("show");
    });

    // Close form when clicking outside the form box
    window.addEventListener("click", function(event) {
        if (event.target === formContainer) {
            formContainer.classList.remove("show");
        }
    });

    // Prevent form from refreshing the page
    signInForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop default form submission
        // alert("Form submitted successfully!"); // Example action
        addUser(); // Call the function to add user
    });

    let savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        usernameElement.innerText = currentUser;
        loadTasks();
    }
});

// function to handle user login/signup
function addUser() {
    // Trim to remove unnecessary spaces
    let newUser = newUsername.value.trim(); 
    // Check if the input is empty
    if (!newUser) {
        // alert("Please enter a username.");
        return;
    }

    let user = users.find(u => u.username === newUser);
    // check if the user doesn't exist, if so, create a new user
    if (!user) {
        user = { username: newUser, tasks: [] };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    currentUser = newUser;
    localStorage.setItem('currentUser', newUser);
    usernameElement.innerText = newUser;

    formContainer.classList.remove("show");
    loadTasks();
}

// function to handle logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    usernameElement.innerText = '';
    tasks.style.display = 'none';
    tasksList.innerHTML = '';
}