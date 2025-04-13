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

/* 
  AI-genererad kod (ChatGPT 4o):
  Denna kod hanterar öppning och stängning av "Add Project"-modalen.
  Visar modalen när användaren klickar på knappen "Add Projects"
  Stänger modalen när man klickar på stängknappen eller utanför modalen
*/
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("addProjectModal");
    const openBtn = document.querySelector(".btn-add");
    const closeBtn = document.querySelector("[data-close]");

    if (modal && openBtn && closeBtn) {
        openBtn.addEventListener("click", () => {
            modal.classList.add("show");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }
});
