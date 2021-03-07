import "../deposit.html";
import "./sharedimports.js";

import venmoqr from "../img/venmoqr.jpg";
const venmoPic = document.getElementById("venmo-qr");
venmoPic.src = venmoqr;

document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	let paypalContainer = document.getElementById("paypalContainer");
	paypalContainer.classList.remove("disabled");
	document.getElementById("pleaseAgree").classList.add("d-none");
	document.getElementById("pleasePay").classList.remove("d-none");
	document.getElementById("venmo-qr-container").classList.remove("d-none");
	paypalContainer.classList.add("depositBorder");
});
document.getElementById("venmo-button").addEventListener("click", (e) => {
	window.open("https://venmo.com/Mountain_Sky_Goldens", "_blank");
});
document.getElementById("dateInput").valueAsDate = new Date();
