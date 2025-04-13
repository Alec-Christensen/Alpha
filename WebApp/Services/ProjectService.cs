using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Services;

public class ProjectService : IProjectService
{
    private readonly ApplicationDbContext _context;

    public ProjectService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Project>> GetAllAsync()
    {
        return await _context.Projects.ToListAsync();
    }

    public async Task<Project?> GetByIdAsync(int id)
    {
        return await _context.Projects.FindAsync(id);
    }

    public async Task CreateAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Project updatedProject)
    {
        var project = await _context.Projects.FindAsync(updatedProject.Id);
        if (project is null) return;

        project.ProjectName = updatedProject.ProjectName;
        project.ClientName = updatedProject.ClientName;
        project.Description = updatedProject.Description;
        project.StartDate = updatedProject.StartDate;
        project.EndDate = updatedProject.EndDate;
        project.Budget = updatedProject.Budget;
        project.Status = updatedProject.Status;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project is null) return;

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
    }
}
