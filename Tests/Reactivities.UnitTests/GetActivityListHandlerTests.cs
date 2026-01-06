using Application.Activities.Queries;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Persistence;

namespace Reactivities.UnitTests;

public class GetActivityListHandlerTests
{

    private static AppDbContext CreateInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        
        return new AppDbContext(options);
    }
    
    private static Activity CreateTestActivity() => new()
    {
        Id = Guid.NewGuid().ToString(),
        Title = "Test  Activity",
        Description = "This is a test activity",
        Category = "Category Test",
        City = "Melbourne",
        Venue = "Venue Test"
    };


    private static List<Activity> GetTestActivities()
    {
        return new List<Activity>
        {

            new Activity
            {

                Id = Guid.NewGuid().ToString(),
                Title = "Test Activity1",
                Description = "This is test activity1",
                Category = "Category Test1",
                City = "City Test1",
                Venue = "Venue Test1"
            },
            new Activity
            {
                Id = Guid.NewGuid().ToString(),
                Title = "Test Activity2",
                Description = "This is test activity2",
                Category = "Category Test2",
                City = "City Test2",
                Venue = "Venue Test2"
            }
        };
    }
    
    [Fact]
    public async Task Handle_ReturnsActivityList_WhenActivitiesExist()
    {
        //Arrange
        
        using var context = CreateInMemoryContext();
        var testActivities = GetTestActivities();
        context.Activities.AddRange(testActivities);
        context.SaveChanges();

        var logger = NullLogger<GetActivityList>.Instance;
        var handler = new GetActivityList.Handler(context, logger);
        var query = new GetActivityList.Query();
        
        //Act
        
        
        var result = await handler.Handle(query, CancellationToken.None);
        
        //Assert
        Assert.NotNull(result);
        Assert.Equal(testActivities.Count, result.Count);
        
    }

    
}