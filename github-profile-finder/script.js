let username_input = document.querySelector(".username-input");

let search_btn = document.querySelector(".search-btn");

let status_message = document.querySelector(".status-message");

let profile_card = document.querySelector(".profile-card");

let avatar = document.querySelector(".avatar");

let name = document.querySelector(".name");

let username = document.querySelector(".username");

let bio = document.querySelector(".bio");

let followers = document.querySelector(".followers");

let following = document.querySelector(".following");

let repos = document.querySelector(".repos");

let location_text = document.querySelector(".location");

let company = document.querySelector(".company");

let joined = document.querySelector(".joined");

let profile_link = document.querySelector(".profile-link");



// ======================================
// GET PROFILE
// ======================================

async function getProfile() {

    let userName = username_input.value.trim();

    if (userName === "") {

        alert("Enter GitHub Username");

        return;

    }

    status_message.textContent = "Searching...";

    profile_card.style.display = "none";

    try {

        let response = await fetch(
            `https://api.github.com/users/${userName}`
        );

        let data = await response.json();

        if (data.message === "Not Found") {

            status_message.textContent =
                "User Not Found";

            setTimeout(function () {

                status_message.textContent = "";

            }, 3000);

            return;

        }

        status_message.textContent = "";

        renderProfile(data);

    }

    catch (error) {

        status_message.textContent =
            "Something went wrong.";

    }

}



// ======================================
// RENDER PROFILE
// ======================================

function renderProfile(data) {

    profile_card.style.display = "block";

    avatar.src = data.avatar_url;

    name.textContent =
        data.name || "No Name";

    username.textContent =
        "@" + data.login;

    bio.textContent =
        data.bio || "No Bio Available";

    followers.textContent =
        data.followers;

    following.textContent =
        data.following;

    repos.textContent =
        data.public_repos;

    location_text.textContent =
        data.location || "Not Available";

    company.textContent =
        data.company || "Not Available";

    let date = new Date(data.created_at);

    joined.textContent =
        date.toDateString();

    profile_link.href =
        data.html_url;

}



// ======================================
// BUTTON CLICK
// ======================================

search_btn.addEventListener("click", function () {

    getProfile();

});



// ======================================
// ENTER KEY
// ======================================

username_input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        getProfile();

    }

});