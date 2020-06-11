import "../deposit.html";
import "./sharedimports.js";

document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	let paypalContainer = document.getElementById("paypalContainer");
	paypalContainer.classList.remove("disabled");
	document.getElementById("pleaseAgree").classList.add("d-none");
	document.getElementById("pleasePay").classList.remove("d-none");
	paypalContainer.classList.add("depositBorder");
});
document.getElementById("dateInput").valueAsDate = new Date();
