let username = document.querySelector("#username");
let saveUser = document.querySelector("#saveUser");
let welcomeText = document.querySelector("#welcomeText");
let themeBtn = document.querySelector("#themeBtn");
let cookieText = document.querySelector("#cookieText");



let storeName = sessionStorage.getItem("username");

if(storeName){
    welcomeText.textContent = `Welcome ${storeName}`;
}
saveUser.addEventListener("click", function () {

    let name = username.value;

    if (name === "") {
        welcomeText.textContent = "Welcome Guest";
    } else {
        sessionStorage.setItem("username", name);

        welcomeText.textContent = `Welcome ${name}`;
    }
    
});

let storeTheme = localStorage.getItem("theme");

if(storeTheme === "dark"){
    document.body.classList.add("dark");
}


themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if (document.cookie.includes("visited=true")) {
    cookieText.textContent = "Welcome Back User";
} else {
    document.cookie = "visited=true";
    cookieText.textContent = "Welcome New User";
};