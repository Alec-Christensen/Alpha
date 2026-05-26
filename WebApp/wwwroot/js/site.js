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
        const targetId = button.getAttribute("data-target").slice(1); // strip leading '#'
        const targetDropdown = document.getElementById(targetId);
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
    }
});

document.addEventListener("click", async function (e) {
    const button = e.target.closest(".btn-edit-project");
    if (!button) return;

    const projectId = button.getAttribute("data-project-id");

    try {
        const response = await fetch(`/projects/edit-project/${projectId}`);
        const modalHtml = await response.text();

        const existing = document.getElementById("editProjectModal");
        if (existing) existing.remove();

        const container = document.createElement("div");
        container.innerHTML = modalHtml;
        document.body.appendChild(container.firstElementChild);

        document.getElementById("editProjectModal").classList.add("show");

        document.querySelector("#editProjectModal .close-modal").addEventListener("click", () => {
            document.getElementById("editProjectModal").classList.remove("show");
        });

    } catch (err) {
        console.error("Kunde inte ladda edit-modalen:", err);
    }
});

