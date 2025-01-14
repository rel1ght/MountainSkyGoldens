import "../adopt.html";
import "./sharedimports.js";

// document.getElementById("form").onsubmit = function() {
// 	var formContainer = document.getElementById("formContainer");
// 	formContainer.classList.add("d-none");
// 	var completeMessage = document.getElementById("afterMessage");
// 	completeMessage.classList.remove("d-none");
// };
function redirect() {
	document.location.href = "adoptsubmitted.html";
}
document.getElementById("formButton").onclick = function() {
	document.location.href = "adoptsubmitted.html";
};
