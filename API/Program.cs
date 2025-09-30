using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Dependency registration
builder.Services.AddControllers();// Add services to the container.

//Adding  app's DbContext to the DI container
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

//  Register custom services (e.g., repositories, application services)
// builder.Services.AddScoped<IYourService, YourService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000","https://localhost:3001"));
app.MapControllers();

using var scope = app.Services.CreateScope(); // we are doing this so that this gets disposed as soon we have used it


var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context); // we dont need to create an intance of the class as its a static class

}

catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An error occured during migration");
}


app.Run();
