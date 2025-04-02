using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers;

[Route("projects")]
public class ProjectsController : Controller
{
    [HttpGet("")]
    public IActionResult Index()
    {
        return View();
    }
}
