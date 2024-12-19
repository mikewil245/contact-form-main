const contactForm = document.getElementById("contact-form");
let formInputs = document.querySelectorAll(".form-group input");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  let textareaMessage = document.getElementById("message");

  if (textareaMessage.value.trim() === "") {
    textareaMessage.nextElementSibling.style.display = "block";
    isValid = false;
  } else {
    textareaMessage.nextElementSibling.style.display = "none";
  }

  formInputs.forEach((input) => {
    if (input.type === "text") {
      if (input.value.trim() === "") {
        input.parentElement.querySelector(".error-message").style.display =
          "block";
        isValid = false;
      } else {
        input.parentElement.querySelector(".error-message").style.display =
          "none";
      }
    }

    if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (input.value.trim() === "") {
        input.parentElement.querySelector(".error-message").style.display =
          "block";
        isValid = false;
      } else if (!emailRegex.test(input.value)) {
        input.parentElement.querySelector(".error-message").style.display =
          "block";
        input.parentElement.querySelector(".error-message").textContent =
          "Please enter a valid email ";
        isValid = false;
      } else {
        input.parentElement.querySelector(".error-message").style.display =
          "none";
      }
    }

    if (input.type === "radio") {
      const radioGroupName = input.name; // Get the group name
      const isChecked = document.querySelector(
        `input[name="${radioGroupName}"]:checked`
      ); // Check if any radio button in the group is selected

      const errorMessage = input
        .closest(".form-group")
        .querySelector(".error-message");

      if (!isChecked) {
        errorMessage.style.display = "block";
        isValid = false;
      } else {
        errorMessage.style.display = "none";
      }
    }

    if (input.type === "checkbox") {
      const checkBoxContainer = input.closest(".check-box"); // Find the parent container
      const errorMessage = checkBoxContainer.querySelector(".error-message"); // Select the error message
      if (!input.checked) {
        errorMessage.style.display = "block";
        isValid = false;
      } else {
        errorMessage.style.display = "none";
      }
    }
  });

  if (isValid) {
    let successContainer = document.querySelector(".success-container");
    successContainer.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    contactForm.reset();
  }
});
