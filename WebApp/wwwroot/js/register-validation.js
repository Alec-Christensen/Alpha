/* 
  AI-genererad kod (ChatGPT 4o):
  Denna kod hanterar validering av formuläret på registreringssidan innan formuläret skickas.
  Den kontrollerar att alla obligatoriska fält är ifyllda (förnamn, efternamn, e-post, lösenord, bekräfta lösenord)
  samt att lösenorden matchar och att användaren har godkänt villkoren.
  Om något är fel visas tydliga felmeddelanden direkt på sidan utan att ladda om den.
  Används för att uppfylla kravet på klientsidevalidering med JavaScript.
*/

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let isValid = true;
        const errors = [];

        // Hämta alla inputfält
        const firstName = document.querySelector("#Input_FirstName");
        const lastName = document.querySelector("#Input_LastName");
        const email = document.querySelector("#Input_Email");
        const password = document.querySelector("#Input_Password");
        const confirmPassword = document.querySelector("#Input_ConfirmPassword");
        const acceptTerms = document.querySelector("#Input_AcceptTerms");

        // Nollställ felmeddelanden
        document.querySelectorAll(".text-danger").forEach(span => span.textContent = "");

        // Validering
        if (!firstName.value.trim()) {
            setError(firstName, "First name is required.");
            isValid = false;
        }

        if (!lastName.value.trim()) {
            setError(lastName, "Last name is required.");
            isValid = false;
        }

        if (!email.value.trim()) {
            setError(email, "Email is required.");
            isValid = false;
        }

        if (!password.value.trim()) {
            setError(password, "Password is required.");
            isValid = false;
        }

        if (!confirmPassword.value.trim()) {
            setError(confirmPassword, "Please confirm your password.");
            isValid = false;
        }

        if (password.value !== confirmPassword.value) {
            setError(confirmPassword, "Passwords do not match.");
            isValid = false;
        }

        if (!acceptTerms.checked) {
            setError(acceptTerms, "You must accept the terms.");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Stoppa formuläret från att skickas
        }
    });

    function setError(inputElement, message) {
        const errorSpan = document.querySelector(`[data-valmsg-for='${inputElement.name}']`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
});
