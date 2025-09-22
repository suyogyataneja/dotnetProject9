using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

// public class AppDbContext(DbContextOptions options):DbContext(options)

public  class  AppDbContext :DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
    {
    }

    // public required DbSet<Activity> Activities { get; set; }
    public DbSet<Activity> Activities { get; set; } = null!; // no 'required'
}