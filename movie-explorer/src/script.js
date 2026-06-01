let movie_input = document.querySelector(".movie-input");

let search_btn = document.querySelector(".search-btn");

let movies_container = document.querySelector(".movies-container");

let status_message = document.querySelector(".status-message");



async function getmovies() {
    let movieName = movie_input.value;

    let url = ` http://www.omdbapi.com/?i=tt3896198&apikey=2b4578b0&s=${movieName}`;

    status_message.textContent = "Searching...";

    let movieResponse = await fetch(url);

    status_message.textContent = "";

    let movieResponseData = await movieResponse.json();

    console.log(movieResponseData);


    if (movieResponseData.Response === "False") {
        status_message.textContent = movieResponseData.Error;

        setTimeout(() => {
            status_message.textContent = "";
        }, 3000);

        return;
    }

    renderMovie(movieResponseData.Search)
}




function renderMovie(movieData) {
    console.log(movieData);

    movies_container.innerHTML = "";

    movieData.forEach(function (movie) {

        let div = document.createElement("div");

        div.className =
            "bg-slate-800 rounded-2xl overflow-hidden border border-slate-700";

        div.innerHTML = `
        <img
            src="${movie.Poster}"
            alt="${movie.Title}"
            class="w-full h-96 object-cover"
        >

        <div class="p-4">

            <h3 class="text-xl font-semibold text-white">
                ${movie.Title}
            </h3>

            <p class="text-slate-400 mt-2">
                Year: ${movie.Year}
            </p>

            <p class="text-slate-400">
                Type: ${movie.Type}
            </p>

        </div>
    `;

        movies_container.appendChild(div);

    });

}




search_btn.addEventListener("click", function () {
    if (movie_input.value.trim() === "") {
        return alert("Enter Movie Name")
    } else {
        getmovies()
        movie_input.value = "";
    }


})


movie_input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        getmovies()
        movie_input.value = "";
    }

})