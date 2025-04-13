/* 
  AI-genererad kod (ChatGPT 4o):
  Denna kod hanterar validering av formuläret på inloggningssidan innan det skickas till servern.
  Den kontrollerar att e-post och lösenord är ifyllda, samt att användaren har möjlighet att få direkt feedback.
  Om något är fel visas tydliga felmeddelanden direkt i gränssnittet utan sidladdning.
  Används för att uppfylla kravet på klientsidevalidering med JavaScript.
*/

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
    const emailInput = document.querySelector("#Input_Email");
    const passwordInput = document.querySelector("#Input_Password");

    form.addEventListener("submit", (e) => {
        let isValid = true;

        // Rensa gamla fel
        document.querySelectorAll(".text-danger").forEach(el => el.textContent = "");

        // Validera email
        if (emailInput.value.trim() === "") {
            showError(emailInput, "Email is required.");
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        // Validera lösenord
        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Password is required.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    function showError(inputElement, message) {
        const errorSpan = document.querySelector(`span[data-valmsg-for="${inputElement.name}"]`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
