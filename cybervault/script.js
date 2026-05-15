// selectors

let floating_btn = document.querySelector(".floating-btn");

let notes_grid = document.querySelector(".notes-grid");

let search_input = document.querySelector(".search-box input");

let modal = document.querySelector(".modal");

let close_modal = document.querySelector(".close-modal");

let save_note_btn = document.querySelector(".save-note-btn");

let note_title = document.querySelector(".note-title");

let note_content = document.querySelector(".note-content");

let note_category = document.querySelector(".note-category");


// State

let notes = [];


// Load Storage

let storeData = localStorage.getItem("notes")
if (storeData) {
    notes = JSON.parse(storeData);
}


// Save Data

function saveData() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Render Function

function renderNotes() {

    // clear old UI
    notes_grid.innerHTML = "";

    // loop notes
    notes.forEach(function (note) {

        // create div
        let div = document.createElement("div");

        // add class
        div.classList.add("note-card");

        // add content
        div.innerHTML = `
        
            <div class="note-top">

                <span class="tag">
                    ${note.category}
                </span>

                <i class="ri-pushpin-line"></i>

            </div>

            <h3>${note.title}</h3>

            <p>
                ${note.content}
            </p>

            <div class="note-footer">

                <span>
                    ${note.createdAt}
                </span>

                <div class="note-actions">

                    <i class="ri-edit-line"></i>

                    <i class="ri-delete-bin-line"></i>

                </div>

            </div>
        
        `;


        const del = div.querySelector(".ri-delete-bin-line");

        del.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id
            })
            saveData()
            renderNotes()
        })

        // show on screen
        notes_grid.appendChild(div);

    });


}
renderNotes()


// Event Listeners

floating_btn.addEventListener("click", function () {

    modal.classList.add("active");

});

close_modal.addEventListener("click", function () {

    modal.classList.remove("active");

});

save_note_btn.addEventListener("click", function () {
    let notesObj = {
        title: note_title.value,
        content: note_content.value,
        category: note_category.value,
        id: Date.now(),
        createdAt: Date.now()
    }

    const clearObjData = document.querySelectorAll("input, textarea, select")

    clearObjData.forEach(function (field) {
        field.value = "";
    })
    modal.classList.remove("active");
    notes.push(notesObj)
    saveData()
    renderNotes()
});