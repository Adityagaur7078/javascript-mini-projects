// Launch date
const launchDate = new Date("December 31, 2026 23:59:59").getTime();

const countdown = () => {

    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(
        distance / (10000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML =
            "<h2>🎉 We Are Live!</h2>";
    }
};

const timer = setInterval(countdown, 1000);
countdown();

const form = document.querySelector(".notify-form");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    message.textContent =
        "✅ Thank you! You'll be notified when we launch.";

    form.reset();
});