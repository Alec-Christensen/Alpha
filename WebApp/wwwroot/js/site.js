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

/*
AI-genererad kod (ChatGPT 4o):
Denna kod hanterar visning av "Edit Project"-modalen via JavaScript.
- När användaren klickar på en Edit-knapp hämtas en färdigifylld modal från servern via fetch.
- Modalen läggs dynamiskt till i DOM och visas direkt utan att sidan laddas om.
- Stängknapp och klick utanför modalen stänger den som förväntat.
*/
document.addEventListener("DOMContentLoaded", function () {
    // Hantera Edit-knappar
    document.querySelectorAll(".btn-edit-project").forEach(button => {
        button.addEventListener("click", async () => {
            const projectId = button.getAttribute("data-project-id");

            try {
                const response = await fetch(`/projects/edit-project/${projectId}`);
                const modalHtml = await response.text();

                // Ta bort befintlig modal om den finns
                const existing = document.getElementById("editProjectModal");
                if (existing) existing.remove();

                // Lägg till modalen i sidan
                const container = document.createElement("div");
                container.innerHTML = modalHtml;
                document.body.appendChild(container.firstElementChild);

                // Visa modalen
                document.getElementById("editProjectModal").classList.add("show");

                // Lägg till stäng-logik
                document.querySelector("#editProjectModal .close-modal").addEventListener("click", () => {
                    document.getElementById("editProjectModal").classList.remove("show");
                });

                // Klick utanför för att stänga
                window.addEventListener("click", function (e) {
                    const modal = document.getElementById("editProjectModal");
                    if (e.target === modal) {
                        modal.classList.remove("show");
                    }
                });

            } catch (err) {
                console.error("Kunde inte ladda edit-modalen:", err);
            }
        });
    });
});

