// selectors

let floating_btn = document.querySelector(".floating-btn");

let hero_btn = document.querySelector(".hero-btn");

let notes_grid = document.querySelector(".notes-grid");

let search_input = document.querySelector(".search-box input");

let modal = document.querySelector(".modal");

let close_modal = document.querySelector(".close-modal");

let save_note_btn = document.querySelector(".save-note-btn");

let note_title = document.querySelector(".note-title");

let note_content = document.querySelector(".note-content");

let note_category = document.querySelector(".note-category");


// state

let notes = [];


// load storage

let storeData = localStorage.getItem("notes");

if(storeData){

    notes = JSON.parse(storeData);

}


// save data

function saveData(){

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


// render function

function renderNotes(notesData){

    notes_grid.innerHTML = "";


    // pinned first

    notesData.sort(function(a,b){

        if(a.pinned !== b.pinned){

            return b.pinned - a.pinned;

        }else{

            return a.id - b.id;

        }

    });


    // loop notes

    notesData.forEach(function(note){

        let div = document.createElement("div");

        div.classList.add("note-card");


        // pinned class

        if(note.pinned){

            div.classList.add("pinned");

        }


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

                    <i class="ri-delete-bin-line"></i>

                </div>

            </div>

        `;


        // delete

        const del = div.querySelector(".ri-delete-bin-line");

        del.addEventListener("click", function(){

            notes = notes.filter(function(item){

                return item.id !== note.id;

            });

            saveData();

            renderNotes(notes);

        });


        // pin

        const pin = div.querySelector(".ri-pushpin-line");

        pin.addEventListener("click", function(){

            note.pinned = !note.pinned;

            saveData();

            renderNotes(notes);

        });


        notes_grid.appendChild(div);

    });

}


renderNotes(notes);


// open modal

floating_btn.addEventListener("click", function(){

    modal.classList.add("active");

});


// hero button

hero_btn.addEventListener("click", function(){

    modal.classList.add("active");

});


// close modal

close_modal.addEventListener("click", function(){

    modal.classList.remove("active");

});


// save note

save_note_btn.addEventListener("click", function(){

    if(
        note_title.value === "" ||
        note_content.value === "" ||
        note_category.value === ""
    ){

        alert("Fill all fields");

        return;

    }


    let notesObj = {

        title: note_title.value,

        content: note_content.value,

        category: note_category.value,

        id: Date.now(),

        createdAt: new Date().toLocaleString(),

        pinned:false

    };


    notes.push(notesObj);


    saveData();

    renderNotes(notes);


    // clear inputs

    const fields = document.querySelectorAll(
        "input, textarea, select"
    );

    fields.forEach(function(field){

        field.value = "";

    });


    modal.classList.remove("active");

});


// search

search_input.addEventListener("input", function(e){

    let filteredNotes = notes.filter(function(note){

        return note.title
        .toLowerCase()
        .includes(
            e.target.value.toLowerCase()
        )

        ||

        note.content
        .toLowerCase()
        .includes(
            e.target.value.toLowerCase()
        );

    });


    renderNotes(filteredNotes);

});