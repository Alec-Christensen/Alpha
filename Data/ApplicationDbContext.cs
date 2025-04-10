using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Data.Entities;

namespace Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // AI-genererad kod av ChatGPT 4o:
        // Den här inställningen säkerställer att 'Budget'-kolumnen i databasen får korrekt precision och inte trunkeras.
        // Decimalvärdet kommer att sparas som decimal(18, 2), vilket innebär 18 siffror totalt varav 2 är decimaler.
        modelBuilder.Entity<Project>()
            .Property(p => p.Budget)
            .HasPrecision(18, 2);
    }
}
