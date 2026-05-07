let input = document.querySelector("input");
let span = document.querySelector("span");

input.addEventListener("input", function(){

    let remaining = 20 - input.value.length;

    span.textContent = remaining;

    if(remaining >= 0){
        span.style.color = "#667eea";
    } else {
        span.style.color = "red";
    }

});