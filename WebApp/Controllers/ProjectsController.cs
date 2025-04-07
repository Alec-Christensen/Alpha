using Microsoft.AspNetCore.Mvc;
using WebApp.Models;

namespace WebApp.Controllers;

[Route("projects")]
public class ProjectsController : Controller
{
    [HttpGet("")]
    public IActionResult Index()
    {
        // TODO: Byt ut mot data från databasen (EF Core) längre fram
        // Tillfällig dummydata för visning av projektkort
        var projects = new List<Project>
        {
            new Project {
        ProjectName = "Website Redesign",
        ClientName = "Gitlab Inc.",
        Description = "Modernisera hela företagets webbplats med nytt UI och UX.",
        StartDate = DateTime.Now.AddDays(-20),
        EndDate = DateTime.Now.AddDays(15),
        Budget = 75000,
        Status = "started"
    },
    new Project {
        ProjectName = "UI Kit för intern app",
        ClientName = "Spotify",
        Description = "Skapa ett återanvändbart komponentbibliotek för utvecklingsteamet.",
        StartDate = DateTime.Now.AddMonths(-2),
        EndDate = DateTime.Now.AddDays(-10),
        Budget = 45000,
        Status = "completed"
    }
        };


        return View(projects);
    }
}
