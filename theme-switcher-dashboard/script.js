let body = document.querySelector("body");

let themeButtons = document.querySelectorAll("[data-theme]");


// Load saved theme

let savedTheme = localStorage.getItem("theme");

if(savedTheme){

    body.className = savedTheme;

}


// Theme buttons

themeButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Get selected theme

        let selectedTheme = button.dataset.theme;


        // Apply theme

        body.className = selectedTheme;


        // Save theme

        localStorage.setItem(
            "theme",
            selectedTheme
        );

    });

});