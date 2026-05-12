// selectors
let input = document.querySelector("#habitInput");
let select = document.querySelector("#category");
let button = document.querySelector("#addBtn");
let habitList = document.querySelector("#habitList");

// code
let habits = [];

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

            renderHabits();

        });

        // complete button
        div.querySelector(".complete-btn").addEventListener("click", function () {

            // toggle completed
            habit.completed = !habit.completed;

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

    renderHabits();

    console.log(habits);

    input.value = "";

    select.selectedIndex = 0;

});