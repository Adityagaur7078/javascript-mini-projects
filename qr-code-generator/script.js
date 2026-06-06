let qr_input = document.querySelector(".qr-input");

let generate_btn = document.querySelector(".generate-btn");

let qr_image = document.querySelector(".qr-image");

let status_message = document.querySelector(".status-message");

function generateQR(){

    if(qr_input.value.trim() === ""){

        status_message.textContent =
        "Please enter text or URL";

        return;
    }

    status_message.textContent =
    "Generating...";

    let qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qr_input.value}`;

    qr_image.src = qrUrl;

    qr_image.classList.remove("hidden");

    qr_image.onload = function(){

        status_message.textContent =
        "QR Generated Successfully";

        setTimeout(function(){

            status_message.textContent = "";

        },2000);

    };
}

generate_btn.addEventListener(
    "click",
    generateQR
);

qr_input.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){

            generateQR();

        }

    }
);