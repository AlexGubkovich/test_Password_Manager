using Microsoft.EntityFrameworkCore;
using TestRESTApp.Entities;

namespace TestRESTApp.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Password> Passwords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Password>()
            .HasKey(x => x.Name);

        base.OnModelCreating(modelBuilder);
    }
}
