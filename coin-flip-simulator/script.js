let coin = document.querySelector(".coin");

let flip_btn = document.querySelector(".flip-btn");

let clear_btn = document.querySelector(".clear-btn");

let result = document.querySelector(".result");

let total_flips = document.querySelector(".total-flips");

let heads_count = document.querySelector(".heads-count");

let tails_count = document.querySelector(".tails-count");

let history_list = document.querySelector(".history-list");



// ================================
// DATA
// ================================

let history = [];

let heads = 0;

let tails = 0;



// ================================
// SAVE
// ================================

function saveData() {

    localStorage.setItem(
        "coinHistory",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "heads",
        heads
    );

    localStorage.setItem(
        "tails",
        tails
    );

}



// ================================
// LOAD
// ================================

let storedHistory = localStorage.getItem("coinHistory");

if (storedHistory) {

    history = JSON.parse(storedHistory);

}

heads = Number(localStorage.getItem("heads")) || 0;

tails = Number(localStorage.getItem("tails")) || 0;



// ================================
// RENDER
// ================================

function renderHistory() {

    history_list.innerHTML = "";

    total_flips.textContent = history.length;

    heads_count.textContent = heads;

    tails_count.textContent = tails;

    if (history.length === 0) {

        history_list.innerHTML = `

            <div class="history-item">

                <span>No Flip History</span>

            </div>

        `;

        return;

    }

    history.forEach(function (item, index) {

        let div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `

            <span>

                Flip ${history.length - index}

            </span>

            <strong>

                ${item}

            </strong>

        `;

        history_list.appendChild(div);

    });

}



// ================================
// FLIP COIN
// ================================

flip_btn.addEventListener("click", function () {

    flip_btn.disabled = true;

    coin.classList.add("flip");

    let random = Math.random() < 0.5
        ? "Heads"
        : "Tails";

    setTimeout(function () {

        coin.classList.remove("flip");

        if (random === "Heads") {

            coin.textContent = "H";

            heads++;

        } else {

            coin.textContent = "T";

            tails++;

        }

        result.textContent = random;

        history.unshift(random);

        saveData();

        renderHistory();

        flip_btn.disabled = false;

    }, 1000);

});



// ================================
// CLEAR
// ================================

clear_btn.addEventListener("click", function () {

    history = [];

    heads = 0;

    tails = 0;

    coin.textContent = "🪙";

    result.textContent = "Click \"Flip Coin\"";

    saveData();

    renderHistory();

});



// ================================
// INITIAL
// ================================

renderHistory();