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



function renderHistory(){

    history_list.innerHTML = "";

    total_rolls.textContent = history.length;

    history.forEach(function(item,index){

        let div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `

        <span>

            Roll ${index+1}

        </span>

        <strong>

            ${item}

        </strong>

        `;

        history_list.appendChild(div);

    });

}



roll_btn.addEventListener("click",function(){

    let randomNumber = Math.floor(Math.random()*6);

    dice.classList.add("roll");

    setTimeout(function(){

        dice.classList.remove("roll");

        dice.textContent = diceEmoji[randomNumber];

    },500);

    history.unshift(

        diceEmoji[randomNumber]

    );

    renderHistory();

});



clear_btn.addEventListener("click",function(){

    history=[];

    dice.textContent="🎲";

    renderHistory();

});



renderHistory();