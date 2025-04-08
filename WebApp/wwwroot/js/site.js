/* AI-genererad kod (ChatGPT 4o):
Denna kod visar och döljer en dropdown-meny när användaren klickar på trepricksknappen.
Koden hanterar även att dropdownen stängs om användaren klickar utanför.*/

document.addEventListener("click", function (e) {
    // Stäng alla öppna dropdowns
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        dropdown.classList.remove("show");
    });

    // Kolla om man klickade på en dropdown-knapp
    const button = e.target.closest("[data-type='dropdown']");
    if (button) {
        e.preventDefault();
        const targetId = button.getAttribute("data-target");
        const targetDropdown = document.querySelector(targetId);
        if (targetDropdown) {
            targetDropdown.classList.toggle("show");
        }
    }
});

