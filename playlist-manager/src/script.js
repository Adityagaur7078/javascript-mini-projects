let song_name = document.querySelector(".song-name");

let artist_name = document.querySelector(".artist-name");

let add_song_btn = document.querySelector(".add-song-btn");

let songs_container = document.querySelector(".songs-container");

let search_input = document.querySelector(".search-input");

let all_songs_btn = document.querySelector(".all-songs-btn");

let favorites_btn = document.querySelector(".favorites-btn");

let total_songs = document.querySelector(".total-songs");

// project start from here

// songs container

let songs = [];

// local storage

let storeData = localStorage.getItem("songs");
if(storeData){
    songs = JSON.parse(storeData);
}
function saveData() {
        localStorage.setItem("songs", JSON.stringify(songs));
}
renderSongs(songs);


// song filteration here 

search_input.addEventListener("input", function (e) {
    let filteredSong = songs.filter(function (song) {
        return song.song_name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderSongs(filteredSong);
})

// all favourite song filteration
favorites_btn.addEventListener("click", function () {
    let favSong = songs.filter(function (favSongs) {
        return favSongs.favourite === true;
    })
    renderSongs(favSong);
})

// all songs filtered

all_songs_btn.addEventListener("click", function () {
    renderSongs(songs);
})

// render starts here

function renderSongs(songsData) {

    // clear old ui

    songs_container.innerHTML = "";

    // total number of songs counter

    total_songs.textContent = songs.length;

    // show every song

    songsData.forEach(function (songData) {
        let div = document.createElement("div");

        div.className = `bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center `;

        div.innerHTML = `
            <div>
                <h3 class="text-xl font-semibold">
                    ${songData.song_name}
                </h3>

                <p class="text-slate-500 mt-1">
                    ${songData.artist_name}
                </p>
            </div>

            <div class="flex gap-4">

                <button class="favorite-btn text-2xl">
                    ${songData.favourite ? "❤️" : "🤍"}
                </button>

                <button class="delete-btn text-2xl">
                    🗑️
                </button>

            </div>
        `;
        songs_container.appendChild(div);

        // delete

        const del = div.querySelector(".delete-btn")

        del.addEventListener("click", function () {
            songs = songs.filter(function (song_id) {
                return song_id.id != songData.id;
            })
            saveData();
            renderSongs(songs);
        })


        // favourite

        const fav = div.querySelector(".favorite-btn")

        fav.addEventListener("click", function () {
            songData.favourite = !songData.favourite;
            saveData();
            renderSongs(songs);
        })

    });


}

add_song_btn.addEventListener("click", function () {


    // checking before add

    if (song_name.value.trim() === "") {
        alert("Song Name is Empty")
        return
    } else if (artist_name.value.trim() === "") {
        alert("Artist Name is Empty")
        return
    }



    let obj = {
        song_name: song_name.value,
        artist_name: artist_name.value,
        favourite: false,
        id: Date.now(),
    };
    songs.push(obj);
    saveData();
    renderSongs(songs);
    song_name.value = "";
    artist_name.value = "";
});


