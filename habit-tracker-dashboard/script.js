// selectors
let input = document.querySelector("#habitInput");
let select = document.querySelector("#category");
let button = document.querySelector("#addBtn");
let habitList = document.querySelector("#habitList");

let totalHabits = document.querySelector("#totalHabits");
let completedHabits = document.querySelector("#completedHabits");

let progressText = document.querySelector("#progressText");
let progressBar = document.querySelector(".progress-bar");

let filterBtn = document.querySelectorAll(".filter-btn");

let streak = document.querySelector("#streak");

// code
let habits = [];

let currentFilter = "all";

// load data from localStorage
let storedData = localStorage.getItem("data");

if (storedData) {

    habits = JSON.parse(storedData);

    renderHabits();

    updateStats();

}

// save data function
function saveData() {

    localStorage.setItem("data", JSON.stringify(habits));

}

// update stats function
function updateStats() {

    // total habits
    totalHabits.textContent = habits.length;

    // completed habits
    let completed = habits.filter(function (e) {

        return e.completed;

    });

    completedHabits.textContent = completed.length;

    // progress percentage
    let progressPercent = 0;

    if (habits.length > 0) {

        progressPercent = Math.floor(
            (completed.length / habits.length) * 100
        );

    }

    // update progress text
    progressText.textContent = `${progressPercent}% Completed`;

    // update progress bar
    progressBar.style.width = `${progressPercent}%`;

    // streak logic
    let streakCount = 0;

    habits.forEach(function (habit) {

        if (habit.completed) {

            streakCount++;

        } else {

            streakCount = 0;

        }

    });

    // update streak UI
    streak.textContent = streakCount;

}

// render function
function renderHabits() {

    // clear old UI
    habitList.innerHTML = "";

    // filtered habits
    let filteredHabits = habits;

    // completed filter
    if (currentFilter === "completed") {

        filteredHabits = habits.filter(function (habit) {

            return habit.completed;

        });

    }

    // pending filter
    else if (currentFilter === "pending") {

        filteredHabits = habits.filter(function (habit) {

            return !habit.completed;

        });

    }

    // loop through filtered habits
    filteredHabits.forEach(function (habit) {

        // create div
        let div = document.createElement("div");

        // add class
        div.classList.add("habit-item");

        // completed class
        if (habit.completed) {

            div.classList.add("completed");

        }

        // add content
        div.innerHTML = `
        
            <div class="left">

                <h3>${habit.title}</h3>

                <p class="category">${habit.category}</p>

            </div>

            <div class="actions">

                <button class="complete-btn">
                    Complete
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        
        `;

        // show on screen
        habitList.appendChild(div);

        // delete button
        div.querySelector(".delete-btn").addEventListener("click", function () {

            habits = habits.filter(function (item) {

                return item.id !== habit.id;

            });

            saveData();

            renderHabits();

            updateStats();

        });

        // complete button
        div.querySelector(".complete-btn").addEventListener("click", function () {

            // toggle completed
            habit.completed = !habit.completed;

            saveData();

            renderHabits();

            updateStats();

        });

    });

}

// filter buttons
filterBtn.forEach(function (btn) {

    btn.addEventListener("click", function () {

        let text = btn.textContent.toLowerCase();

        currentFilter = text;

        renderHabits();

    });

});

// add habit
button.addEventListener("click", function () {

    if (input.value === "") {

        alert("Enter a Habit");

        return;

    }

    if (select.value === "") {

        alert("Select Category");

        return;

    }

    let habit = {

        id: Date.now(),

        title: input.value,

        category: select.value,

        completed: false

    };

    habits.push(habit);

    saveData();

    renderHabits();

    updateStats();

    input.value = "";

    select.selectedIndex = 0;

});