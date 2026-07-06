let search_input = document.querySelector(".search-input");

let project_cards = document.querySelectorAll(".project-card");

let project_count = document.querySelector(".project-count");



// ===============================
// SEARCH PROJECTS
// ===============================

search_input.addEventListener("input", function (e) {

    let searchValue = e.target.value.toLowerCase().trim();

    let visibleProjects = 0;

    project_cards.forEach(function (card) {

        let title = card
            .querySelector("h2")
            .textContent
            .toLowerCase();

        let description = card
            .querySelector("p")
            .textContent
            .toLowerCase();

        if (
            title.includes(searchValue) ||
            description.includes(searchValue)
        ) {

            card.style.display = "flex";

            visibleProjects++;

        }

        else {

            card.style.display = "none";

        }

    });

    project_count.textContent = visibleProjects;

});



// ===============================
// SCROLL ANIMATION
// ===============================

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },

    {
        threshold: 0.2
    }

);

project_cards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    card.style.transition =
        "all .6s ease";

    observer.observe(card);

});



// ===============================
// PROJECT COUNTER
// ===============================

project_count.textContent = project_cards.length;



// ===============================
// SCROLL TO TOP BUTTON
// ===============================

let topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.width = "55px";
topBtn.style.height = "55px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#8b5cf6";
topBtn.style.color = "white";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";
topBtn.style.transition = ".3s";

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



// ===============================
// CONSOLE MESSAGE
// ===============================

console.log(
    "🚀 JavaScript Mini Projects Portfolio Loaded Successfully!"
);