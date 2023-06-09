
   function prefsAlert() {
    var alertContainer = document.getElementById("alert-container");
    var doNotShowAgainCheckbox = document.getElementById("do-not-show-again");

    try {
      var doNotShowAgain = localStorage.getItem("do-not-show-again");
      console.log("Stored value:", doNotShowAgain);

      if (doNotShowAgain !== "true") {
        alertContainer.style.display = "flex";
      } else {
        alertContainer.style.display = "none";
      }

      var okButton = document.querySelector("#alert-box button");
      okButton.addEventListener("click", function handleButtonClick() {
        if (doNotShowAgainCheckbox.checked) {
          localStorage.setItem("do-not-show-again", "true");
          console.log("Value stored: true");
        } else {
          localStorage.removeItem("do-not-show-again");
          console.log("Value removed");
        }
        alertContainer.style.display = "none";
        okButton.removeEventListener("click", handleButtonClick);
      });
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }

  var okButton = document.querySelector("#alert-box button");
  okButton.addEventListener("click", prefsAlert);

  // Call prefsAlert initially to check the stored value on page load
  prefsAlert();

/*
function prefsAlert() {
    var alertContainer = document.getElementById("alert-container");
    var doNotShowAgainCheckbox = document.getElementById("do-not-show-again");
  
    var doNotShowAgain = localStorage.getItem("do-not-show-again");
    if (doNotShowAgain !== "true") {
      alertContainer.style.display = "flex";
    }
  
    var okButton = document.querySelector("#alert-box button");
    okButton.addEventListener("click", function() {
      if (doNotShowAgainCheckbox.checked) {
        localStorage.setItem("do-not-show-again", true);
      }
      alertContainer.style.display = "none";
    });
} */

export default prefsAlert;
