const countText = document.getElementById("count");

const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");

let count = 0;

increaseBtn.addEventListener("click", () => {
count++;
countText.textContent = count;
});

decreaseBtn.addEventListener("click", () => {
count--;
countText.textContent = count;
});

resetBtn.addEventListener("click", () => {
count = 0;
countText.textContent = count;
});