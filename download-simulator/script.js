let startBtn = document.querySelector("#downloadBtn");
let pro = document.querySelector(".progress-bar");
let percent = document.querySelector("#percent");
let alertBox = document.querySelector(".alert");

startBtn.addEventListener("click", function () {
    startBtn.disabled = true;
    let count = 0;
    startBtn.textContent = "Downloading..."
    let interval = setInterval(function () {
        if (count < 100) {
            count++;
            pro.style.width = `${count}%`;
            percent.textContent = `${count}%`;

        } else {
            clearInterval(interval);
            startBtn.textContent = "Downloaded";
            percent.style.color = "#22c55e";
            alertBox.style.display = "block";
            setTimeout(function () {
                alertBox.style.display = "none";
                pro.style.width = "0%";
                percent.textContent = "0%";
                startBtn.textContent = "Start Download"
                startBtn.disabled = false;
                percent.style.color = "#444";
            }, 3000);
        }
    }, 9000 / 100);

});