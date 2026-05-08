const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const mobile = document.querySelector("#mobile");
const error = document.querySelectorAll(".error");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    const mobileRegex = /^[6-9]\d{9}$/;

    let isValid = true;

    if (username.value === "") {
        error[0].textContent = "Enter Username";
        isValid = false;

    } else if (!usernameRegex.test(username.value)) {
        error[0].textContent = "Invalid Username";
        isValid = false;

    } else {
        error[0].textContent = "";
    }

    if (email.value === "") {
        error[1].textContent = "Enter Email";
        isValid = false;

    } else if (!emailRegex.test(email.value)) {
        error[1].textContent = "Invalid Email";
        isValid = false;

    } else {
        error[1].textContent = "";
    }

    if (password.value === "") {
        error[2].textContent = "Enter Password";
        isValid = false;

    } else if (!passwordRegex.test(password.value)) {
        error[2].textContent = "Invalid Password";
        isValid = false;

    } else {
        error[2].textContent = "";
    }

    if (mobile.value === "") {
        error[3].textContent = "Enter Mobile";
        isValid = false;

    } else if (!mobileRegex.test(mobile.value)) {
        error[3].textContent = "Invalid Mobile";
        isValid = false;

    } else {
        error[3].textContent = "";
    }

    if (isValid) {
        alert("Form Submitted Successfully");

        form.reset();
    }

});