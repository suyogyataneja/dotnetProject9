using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using Application.Activities.Queries;

namespace Reactivities.UnitTests;

public class GetActivityDetailsHandlerTests
{
    [Fact]
    public void Test1()
    {

    }

    [Fact]
    public async Task Handle_ReturnsActivity_WhenActivityExists()
    {

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;

        var testActivity = new Activity
        {
            Id = Guid.NewGuid().ToString(),
            Title = "Test Activity",
            Description = "This is test activity",
            Category = "Category Test",
            City = "City Test",
            Venue = "Venue Test"
        };
        
        // Seed the context 
        using (var context = new AppDbContext(options))
        {
            context.Activities.Add(testActivity);
            context.SaveChanges();
        }
        
        
        //Act
        Activity result;

        using (var context = new AppDbContext(options))
        {
            var handler =  new GetActivityDetails.Handler(context);
            var query = new GetActivityDetails.Query {Id = testActivity.Id};
            result = await handler.Handle(query, CancellationToken.None);
        }
        
        //Assert
        Assert.NotNull(result);
        Assert.Equal(testActivity.Id, result.Id);
    }
}