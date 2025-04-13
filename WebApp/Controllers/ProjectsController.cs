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

}

