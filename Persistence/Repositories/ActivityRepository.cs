// Persistence/Repositories/ActivityRepository.cs

using Domain;
using Domain.Interfaces.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class ActivityRepository : IActivityRepository
{
    private readonly AppDbContext _context;

    public ActivityRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<Activity>> GetAllAsync() =>
        await _context.Activities.ToListAsync();

    public async Task<Activity?> GetByIdAsync(Guid id) =>
        await _context.Activities.FindAsync(id);

    public async Task AddAsync(Activity activity) =>
        await _context.Activities.AddAsync(activity);

    public void Update(Activity activity) =>
        _context.Activities.Update(activity);

    public void Delete(Activity activity) =>
        _context.Activities.Remove(activity);

    public async Task<bool> SaveChangesAsync() =>
        await _context.SaveChangesAsync() > 0;
}