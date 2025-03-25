// const inputBox = document.querySelector('.input-box');
// const tasksList = document.querySelector('.tasks-list');
// const message = document.querySelector('#message');
// const tasks = document.querySelector('.tasks');

// let username = document.querySelector('#user-name');
// let newUsername = document.querySelector('#userName');

// const openFormBtn = document.getElementById("openFormBtn");
// const closeFormBtn = document.getElementById("closeFormBtn");
// const formContainer = document.getElementById("formContainer");
// const signInForm = document.querySelector("form");

// let users = [];

// console.log(username.innerText);

// function addTask() {
//     if(username.innerText === 'Guest') {
//         // message.textContent = 'Please login to add tasks';
//         alert('Please login to add tasks');
//         return;
//     }
//     if(inputBox.value === '') {
//         message.textContent = 'Please enter a task';
//         // alert('Please enter a task');
//     }
//     else {
//         tasks.style.display = 'block';
//         let li = document.createElement('li');
//         li.textContent = inputBox.value;
//         tasksList.appendChild(li);
//         inputBox.value = '';
//         message.textContent = '';

//         let span = document.createElement('span');
//         span.innerHTML = '&times;';
//         span.className = 'close';
//         li.appendChild(span);
//     }
//     // saveData();
// }

// tasksList.addEventListener('click', function(e) {
//     if(e.target.tagName === 'LI') {
//         e.target.classList.toggle('checked');
//     }
//     else if(e.target.tagName === 'SPAN') {
//         e.target.parentElement.remove();
//     }
// },false);

// document.addEventListener("DOMContentLoaded", function() {

//     // Open form
//     openFormBtn.addEventListener("click", function() {
//         formContainer.classList.add("show");
//     });

//     // Close form
//     closeFormBtn.addEventListener("click", function() {
//         formContainer.classList.remove("show");
//     });

//     // Close form when clicking outside the form box
//     window.addEventListener("click", function(event) {
//         if (event.target === formContainer) {
//             formContainer.classList.remove("show");
//         }
//     });

//     // Prevent form from refreshing the page
//     signInForm.addEventListener("submit", function(event) {
//         event.preventDefault(); // Stop default form submission
//         // alert("Form submitted successfully!"); // Example action
//     });
// });


// function addUser() {
//     const newUser = newUsername.value.trim(); // Trim to remove unnecessary spaces

//     if (!newUser) {
//         // alert("Please enter a username.");
//         return;
//     }

//     // Check if the user already exists
//     if (users.includes(newUser)) {
//         alert("User already exists");
//         return; // Stop execution
//     }

//     // Add user if not exists
//     users.push({newUser:[]});
//     username.innerHTML = newUser;
//     formContainer.classList.remove("show"); // Close form
// }


// function saveData() {
//     let data = localStorage.setItem('tasks', tasksList.innerHTML);
//     currentUser = username.innerText;
//     users.push({currentUser : data});
// }


const inputBox = document.querySelector('.input-box');
const tasksList = document.querySelector('.tasks-list');
const message = document.querySelector('#message');
const tasks = document.querySelector('.tasks');

let usernameElement = document.querySelector('#user-name');
let newUsername = document.querySelector('#userName');

const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const formContainer = document.getElementById("formContainer");
const signInForm = document.querySelector("form");

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

// Function to load user's tasks
function loadTasks() {
    tasksList.innerHTML = "";
    if (currentUser) {
        let user = users.find(u => u.username === currentUser);
        if (user && user.tasks.length > 0) {
            tasks.style.display = 'block';
            user.tasks.forEach(task => {
                let li = document.createElement('li');
                li.textContent = task;

                let span = document.createElement('span');
                span.innerHTML = '&times;';
                span.className = 'close';
                li.appendChild(span);

                tasksList.appendChild(li);
            });
        }
    }
}

// Function to add a new task
function addTask() {
    if (!currentUser) {
        alert('Please login to add tasks');
        return;
    }
    if (inputBox.value.trim() === '') {
        message.textContent = 'Please enter a task';
        return;
    }

    let user = users.find(u => u.username === currentUser);
    if (user) {
        user.tasks.push(inputBox.value.trim());
        localStorage.setItem("users", JSON.stringify(users));
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

// Event listener for task clicks (toggle or delete)
tasksList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    } else if (e.target.tagName === 'SPAN') {
        let taskText = e.target.parentElement.textContent.slice(0, -1);
        let user = users.find(u => u.username === currentUser);
        if (user) {
            user.tasks = user.tasks.filter(task => task !== taskText);
            localStorage.setItem("users", JSON.stringify(users));
        }
        e.target.parentElement.remove();
    }
}, false);

// Handle login form
document.addEventListener("DOMContentLoaded", function() {
    openFormBtn.addEventListener("click", function() {
        formContainer.classList.add("show");
    });

    closeFormBtn.addEventListener("click", function() {
        formContainer.classList.remove("show");
    });

    window.addEventListener("click", function(event) {
        if (event.target === formContainer) {
            formContainer.classList.remove("show");
        }
    });

    signInForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        addUser();
    });

    let savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = savedUser;
        usernameElement.innerText = currentUser;
        loadTasks();
    }
});

// Function to handle user login/signup
function addUser() {
    let newUser = newUsername.value.trim();
    if (!newUser) return;

    let user = users.find(u => u.username === newUser);
    if (!user) {
        user = { username: newUser, tasks: [] };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    }

    currentUser = newUser;
    localStorage.setItem("currentUser", newUser);
    usernameElement.innerText = newUser;

    formContainer.classList.remove("show");
    loadTasks();
}
