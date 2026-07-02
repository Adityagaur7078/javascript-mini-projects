let dice = document.querySelector(".dice");

let roll_btn = document.querySelector(".roll-btn");

let clear_btn = document.querySelector(".clear-btn");

let history_list = document.querySelector(".history-list");

let total_rolls = document.querySelector(".total-rolls");

const diceEmoji = [
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
];

let history = [];

function renderHistory() {

    history_list.innerHTML = "";

    total_rolls.textContent = history.length;

    if (history.length === 0) {

        history_list.innerHTML = `
            <div class="history-item">
                <span>No Rolls Yet</span>
            </div>
        `;

        return;
    }

    history.forEach(function (item, index) {

        let div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
            <span>
                Roll ${history.length - index}
            </span>

            <strong>
                ${item.emoji} (${item.value})
            </strong>
        `;

        history_list.appendChild(div);

    });

}

roll_btn.addEventListener("click", function () {

    roll_btn.disabled = true;

    dice.classList.add("roll");

    let randomNumber = Math.floor(Math.random() * 6);

    setTimeout(function () {

        dice.classList.remove("roll");

        dice.textContent = diceEmoji[randomNumber];

        history.unshift({
            value: randomNumber + 1,
            emoji: diceEmoji[randomNumber]
        });

        renderHistory();

        roll_btn.disabled = false;

    }, 500);

});

clear_btn.addEventListener("click", function () {

    history = [];

    dice.textContent = "🎲";

    renderHistory();

});

renderHistory();