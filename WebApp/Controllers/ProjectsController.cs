using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Data;
using Microsoft.EntityFrameworkCore;
using Data.Entities;

namespace WebApp.Controllers;

[Authorize]
[Route("projects")]
public class ProjectsController : Controller
{
    private readonly ApplicationDbContext _context;

    public ProjectsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var projects = await _context.Projects.ToListAsync();
        return View(projects);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Project project)
    {
        if (!ModelState.IsValid)
            return RedirectToAction("Index");

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return RedirectToAction("Index");
    }

    // GET: Hämta projektdata och visa Edit-modalen
    [HttpGet("edit-project/{id}")]
    public async Task<IActionResult> EditProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        return PartialView("Partials/Components/_EditProjectModal", project);
    }

    // POST: Spara ändringar i projektet
    [HttpPost("edit/{id}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Project updatedProject)
    {
        if (!ModelState.IsValid)
            return View("Partials/Components/_EditProjectModal", updatedProject);

        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        project.ProjectName = updatedProject.ProjectName;
        project.ClientName = updatedProject.ClientName;
        project.Description = updatedProject.Description;
        project.StartDate = updatedProject.StartDate;
        project.EndDate = updatedProject.EndDate;
        project.Budget = updatedProject.Budget;
        project.Status = updatedProject.Status;

        await _context.SaveChangesAsync();
        return RedirectToAction("Index");
    }

    [HttpPost("delete/{id}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return RedirectToAction("Index");
    }
}

