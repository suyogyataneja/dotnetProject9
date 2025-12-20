using Domain;

namespace Application.Interfaces;

public class IActivityRepository
{
    Task<List<Activity>> GetAllAsync();
    Task<Activity?> GetByIdAsync(Guid id);
    Task AddAsync(Activity activity);
    void Update(Activity activity);
    void Delete(Activity activity);
    Task<bool> SaveChangesAsync();
}