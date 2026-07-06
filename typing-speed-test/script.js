let paragraph = document.querySelector(".paragraph");

let typing_input = document.querySelector(".typing-input");

let start_btn = document.querySelector(".start-btn");

let restart_btn = document.querySelector(".restart-btn");

let time = document.querySelector(".time");

let wpm = document.querySelector(".wpm");

let accuracy = document.querySelector(".accuracy");

let mistakes = document.querySelector(".mistakes");

let result_message = document.querySelector(".result-message");



// ====================================
// PARAGRAPHS
// ====================================

const paragraphs = [

    "JavaScript is one of the most popular programming languages used for building interactive web applications.",

    "Practice every day because consistency is more important than studying for many hours once a week.",

    "Frontend developers create beautiful user interfaces while backend developers build scalable server applications.",

    "React helps developers build reusable user interface components using JavaScript and modern programming concepts.",

    "Coding becomes easier when you understand the logic instead of memorizing syntax from tutorials."

];



// ====================================
// VARIABLES
// ====================================

let currentParagraph = "";

let timerInterval = null;

let totalTime = 60;

let gameStarted = false;



// ====================================
// START TEST
// ====================================

function startTest() {

    if (gameStarted) return;

    gameStarted = true;

    totalTime = 60;

    time.textContent = totalTime;

    typing_input.value = "";

    result_message.textContent = "Typing Test Started...";

    currentParagraph =
        paragraphs[
        Math.floor(Math.random() * paragraphs.length)
        ];

    paragraph.textContent = currentParagraph;

    timerInterval = setInterval(function () {

        totalTime--;

        time.textContent = totalTime;

        calculateStats();

        if (totalTime <= 0) {

            clearInterval(timerInterval);

            typing_input.disabled = true;

            result_message.textContent =
                "⏰ Time's Up!";

        }

    }, 1000);

}



// ====================================
// CALCULATE
// ====================================

function calculateStats() {

    let typedText = typing_input.value;

    let correct = 0;

    let wrong = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === currentParagraph[i]) {

            correct++;

        } else {

            wrong++;

        }

    }

    mistakes.textContent = wrong;

    let acc = 0;

    if (typedText.length > 0) {

        acc = Math.round(
            (correct / typedText.length) * 100
        );

    }

    accuracy.textContent = `${acc}%`;

    let words = typedText.trim().split(/\s+/).length;

    if (typedText.trim() === "") {

        words = 0;

    }

    let elapsed = 60 - totalTime;

    if (elapsed <= 0) {

        wpm.textContent = 0;

    } else {

        let speed = Math.round(
            (words / elapsed) * 60
        );

        wpm.textContent = speed;

    }

}



// ====================================
// INPUT
// ====================================

typing_input.addEventListener("input", function () {

    if (!gameStarted) return;

    calculateStats();

    if (typing_input.value === currentParagraph) {

        clearInterval(timerInterval);

        typing_input.disabled = true;

        result_message.textContent =
            "🎉 Paragraph Completed!";

    }

});



// ====================================
// START
// ====================================

start_btn.addEventListener("click", function () {

    typing_input.disabled = false;

    startTest();

});



// ====================================
// RESTART
// ====================================

restart_btn.addEventListener("click", function () {

    clearInterval(timerInterval);

    gameStarted = false;

    typing_input.disabled = false;

    typing_input.value = "";

    paragraph.textContent = "";

    totalTime = 60;

    time.textContent = 60;

    wpm.textContent = 0;

    accuracy.textContent = "100%";

    mistakes.textContent = 0;

    result_message.textContent =
        "Click \"Start Test\" to begin.";

});



// ====================================
// INITIAL
// ====================================

paragraph.textContent =
    "Click Start Test to load a random paragraph.";