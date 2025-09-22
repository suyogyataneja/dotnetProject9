using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
   
   private  readonly  AppDbContext _context;
   
   public ActivitiesController(AppDbContext context)
   {
      _context = context;
   }

   [HttpGet]

   public async Task<ActionResult<List<Activity>>> GetActivities()   
   // Most servers use multithreading 
   // best practice to use async when a request comes in and encounters an await keyword then it is going to pass the request
   // on to pass on the request to a separate thread known as a request delegate(REQUEST DELEGATE)
   // that thread is going to be responsible for going to the database and retrieving the data.
   // In the meantime rge original thread that the request came in on can handle other requests, while thats waiting
   // Once the database has done its thing then its going to pass back the results to the original threads where the request 
   // came in and its going to pass back the results to the client. So its a SCALABILITY FEATURE
   // ONE wont see major difference b/w async and no async as its not going to be perceptible but its best practice to make 
   // use of async when making a request to the database.
   {

      return await _context.Activities.ToListAsync();
   }


   [HttpGet("{id}")]

   public async Task<ActionResult<Activity>> GetActivityById(string id)
   {

      var activity = await _context.Activities.FindAsync(id);
      // we are doing a check as id's can be null here
      if (activity == null) return NotFound();
      
      return activity;
   }
}
// public class ActivitiesController(AppDbContext context) : BaseApiController  // this is called primary constructor
// {
//     private readonly AppDbContext _context = context;
//
//     [HttpGet]
//     public async Task<ActionResult<List<Activity>>> GetActivities()
//     {
//
//         return await _context.Activities.ToListAsync();
//
//     }
// }