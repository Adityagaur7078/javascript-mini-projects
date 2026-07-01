let title_input = document.querySelector(".title-input");

let amount_input = document.querySelector(".amount-input");

let type_input = document.querySelector(".type-input");

let category_input = document.querySelector(".category-input");

let add_btn = document.querySelector(".add-btn");

let search_input = document.querySelector(".search-input");

let all_btn = document.querySelector(".all-btn");

let income_btn = document.querySelector(".income-btn");

let expense_btn = document.querySelector(".expense-btn");

let transaction_list = document.querySelector(".transaction-list");

let total_balance = document.querySelector(".total-balance");

let total_income = document.querySelector(".total-income");

let total_expense = document.querySelector(".total-expense");

let total_transactions = document.querySelector(".total-transactions");



// ==========================================
// LOCAL STORAGE
// ==========================================

let transactions = [];

let storedData = localStorage.getItem("transactions");

if (storedData) {
    transactions = JSON.parse(storedData);
}

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}



// ==========================================
// SUMMARY
// ==========================================

function updateSummary() {

    let income = transactions
        .filter(function (item) {
            return item.type === "income";
        })
        .reduce(function (total, item) {
            return total + item.amount;
        }, 0);

    let expense = transactions
        .filter(function (item) {
            return item.type === "expense";
        })
        .reduce(function (total, item) {
            return total + item.amount;
        }, 0);

    total_income.textContent = `₹${income}`;

    total_expense.textContent = `₹${expense}`;

    total_balance.textContent = `₹${income - expense}`;

    total_transactions.textContent = transactions.length;

}



// ==========================================
// RENDER
// ==========================================

function renderTransactions(data) {

    transaction_list.innerHTML = "";

    if (data.length === 0) {

        transaction_list.innerHTML = `
        <div class="transaction">

            <h3>No Transactions Found</h3>

        </div>
        `;

        updateSummary();

        return;

    }

    data.forEach(function (item) {

        let div = document.createElement("div");

        div.className = "transaction";

        div.innerHTML = `
        
        <div>

            <h3>${item.title}</h3>

            <p>
                ${item.category}
                •
                ${item.type}
            </p>

        </div>

        <div class="transaction-right">

            <h4
            style="
            color:${item.type === "income" ? "#22c55e" : "#ef4444"}
            "
            >
                ${item.type === "income" ? "+" : "-"}₹${item.amount}
            </h4>

            <button class="delete-btn">

                Delete

            </button>

        </div>

        `;

        transaction_list.appendChild(div);

        let delete_btn = div.querySelector(".delete-btn");

        delete_btn.addEventListener("click", function () {

            transactions = transactions.filter(function (transaction) {

                return transaction.id !== item.id;

            });

            saveData();

            renderTransactions(transactions);

        });

    });

    updateSummary();

}



// ==========================================
// ADD
// ==========================================

add_btn.addEventListener("click", function () {

    if (title_input.value.trim() === "") {

        alert("Enter Title");

        return;

    }

    if (amount_input.value.trim() === "") {

        alert("Enter Amount");

        return;

    }

    let obj = {

        id: Date.now(),

        title: title_input.value,

        amount: Number(amount_input.value),

        type: type_input.value,

        category: category_input.value

    };

    transactions.push(obj);

    saveData();

    renderTransactions(transactions);

    title_input.value = "";

    amount_input.value = "";

});



// ==========================================
// SEARCH
// ==========================================

search_input.addEventListener("input", function (e) {

    let filtered = transactions.filter(function (item) {

        return item.title
            .toLowerCase()
            .includes(
                e.target.value.toLowerCase()
            );

    });

    renderTransactions(filtered);

});



// ==========================================
// FILTERS
// ==========================================

all_btn.addEventListener("click", function () {

    document
        .querySelectorAll(".filter-section button")
        .forEach(function (btn) {

            btn.classList.remove("active");

        });

    all_btn.classList.add("active");

    renderTransactions(transactions);

});



income_btn.addEventListener("click", function () {

    document
        .querySelectorAll(".filter-section button")
        .forEach(function (btn) {

            btn.classList.remove("active");

        });

    income_btn.classList.add("active");

    let income = transactions.filter(function (item) {

        return item.type === "income";

    });

    renderTransactions(income);

});



expense_btn.addEventListener("click", function () {

    document
        .querySelectorAll(".filter-section button")
        .forEach(function (btn) {

            btn.classList.remove("active");

        });

    expense_btn.classList.add("active");

    let expense = transactions.filter(function (item) {

        return item.type === "expense";

    });

    renderTransactions(expense);

});



// ==========================================
// INITIAL RENDER
// ==========================================

renderTransactions(transactions);