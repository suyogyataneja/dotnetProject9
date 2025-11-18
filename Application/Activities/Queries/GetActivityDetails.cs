using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{


    public class Query : IRequest<Activity>
    {
        public string Id { get; set; }
        // public string Id { get; set; } = Guid.NewGuid().ToString();
        
    }

    // Public class Handler
    public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
    {

    
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {

         var activity = await context.Activities.FindAsync(request.Id, cancellationToken);

         // WE Dont have ability to return HTTP RESPONSE CODES here
         if (activity == null) throw new Exception("Activity not found"); 
         return activity;
        }
        
    }
}