function prefsAlert() {
    var alertContainer = document.getElementById("alert-container");
    var doNotShowAgainCheckbox = document.getElementById("do-not-show-again");
  
    var doNotShowAgain = localStorage.getItem("doNotShowAgain");
    if (doNotShowAgain !== "true") {
      alertContainer.style.display = "flex";
    }
  
    var okButton = document.querySelector("#alert-box button");
    okButton.addEventListener("click", function() {
      if (doNotShowAgainCheckbox.checked) {
        localStorage.setItem("doNotShowAgain", true);
      }
      alertContainer.style.display = "none";
    });
}

export default prefsAlert;