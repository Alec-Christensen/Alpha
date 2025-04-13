using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Data.Entities;
using WebApp.Services;

namespace WebApp.Controllers;

[Authorize]
[Route("projects")]
public class ProjectsController : Controller
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet("")]
    public async Task<IActionResult> Index()
    {
        var projects = await _projectService.GetAllAsync();
        return View(projects);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Project project)
    {
        if (!ModelState.IsValid)
            return RedirectToAction("Index");

        await _projectService.CreateAsync(project);
        return RedirectToAction("Index");
    }

    // GET: Hämta projektdata och visa Edit-modalen
    [HttpGet("edit-project/{id}")]
    public async Task<IActionResult> EditProject(int id)
    {
        var project = await _projectService.GetByIdAsync(id);
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

        await _projectService.UpdateAsync(updatedProject);
        return RedirectToAction("Index");
    }

    [HttpPost("delete/{id}")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        await _projectService.DeleteAsync(id);
        return RedirectToAction("Index");
    }
}

