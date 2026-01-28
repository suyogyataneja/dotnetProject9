using API.Middleware;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;
using Domain;
using Domain.Interfaces.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Persistence.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Dependency registration
builder.Services.AddControllers();// Add services to the container.

//Adding  app's DbContext to the DI container
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentityApiEndpoints<User>(options =>
    {
        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();


// Adding CORS 
builder.Services.AddCors();

// builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

//  Register custom services (e.g., repositories, application services)
// builder.Services.AddScoped<IYourService, YourService>();

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>(); // this exceptiomiddleware is only created when there's an exception


builder.Services.AddScoped<IActivityRepository, ActivityRepository>();

// Adding Swagger services 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
//ADDING CORS CONFIGURATION

//Without CORS, anyone could open your API from their malicious website. CORS ensures only trusted origins can access your API.

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000","https://localhost:3001","http://localhost:3001"));

//order of UseAuthentication and UseAuthorization is important
app.UseAuthentication();
app.UseAuthorization();

//Enable Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Reactivtities API v1");
    c.RoutePrefix = string.Empty;
});



app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

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
