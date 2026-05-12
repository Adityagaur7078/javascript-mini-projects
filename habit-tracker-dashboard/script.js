// selectors
let input = document.querySelector("#habitInput");
let select = document.querySelector("#category");
let button = document.querySelector("#addBtn");
let habitList = document.querySelector("#habitList");
let totalHabits = document.querySelector("#totalHabits");
let completedHabits = document.querySelector("#completedHabits");
let progressText = document.querySelector("#progressText");
let progressBar = document.querySelector(".progress-bar");

// code
let habits = [];

// load data from localStorage
let storedData = localStorage.getItem("data");

if (storedData) {
    habits = JSON.parse(storedData);
    renderHabits();
    updateStats()
}

// save data function
function saveData() {
    localStorage.setItem("data", JSON.stringify(habits));
}


// Update Stats function
function updateStats() {
     

    totalHabits.textContent = habits.length
    let completed = habits.filter(function (e){
        return e.completed;
    });

    completedHabits.textContent = completed.length

    let progressPercentage = progressBar.style.width = `${(completed.length/habits.length)*100}%`

    progressText.textContent = `${progressPercentage}`
}


// render function
function renderHabits() {

    // clear old UI
    habitList.innerHTML = "";

    // loop through array
    habits.forEach(function (habit) {

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
            updateStats()
            renderHabits();

        });

        // complete button
        div.querySelector(".complete-btn").addEventListener("click", function () {

            // toggle completed
            habit.completed = !habit.completed;

            saveData();
            updateStats()
            // render again
            renderHabits();

        });

    });

}

// button Add Habits
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

    updateStats()
    input.value = "";

    select.selectedIndex = 0;

});