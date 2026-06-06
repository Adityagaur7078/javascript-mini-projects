let qr_input = document.querySelector(".qr-input");

let generate_btn = document.querySelector(".generate-btn");

let qr_image = document.querySelector(".qr-image");

let status_message = document.querySelector(".status-message");


// Generate QR

function generateQR() {

    if (qr_input.value.trim() === "") {

        status_message.textContent =
            "Please enter text or URL";

        setTimeout(function () {

            status_message.textContent = "";

        }, 2000);

        return;
    }

    status_message.textContent = "Generating QR Code...";

    let qrUrl =
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qr_input.value}`;

    qr_image.src = qrUrl;

    qr_image.classList.remove("hidden");

    qr_image.onload = function () {

        status_message.textContent =
            "QR Code Generated Successfully";

        setTimeout(function () {

            status_message.textContent = "";

        }, 2000);

    };

}


// Button Click

generate_btn.addEventListener(
    "click",
    generateQR
);


// Enter Key

qr_input.addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Enter") {

            generateQR();

        }

    }
);