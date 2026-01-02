using Domain;
using Domain.Interfaces.Interfaces;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{


    public class Query : IRequest<Activity>
    {
        // public Guid Id { get; set; }
        
        public string Id { get; set; } = string.Empty;
        // public string Id { get; set; } = Guid.NewGuid().ToString();
        
    }

    // Public class Handler
     public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
    //public class Handler(IActivityRepository repository) :IRequestHandler<Query, Activity>
    {

        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {

             var activity = await context.Activities.FindAsync(request.Id, cancellationToken);
             var activity = await repository.GetByIdAsync(request.Id);
            // var activity = await repository.GetByIdAsync(request.Id);       
            
            // WE Dont have ability to return HTTP RESPONSE CODES here
            if (activity == null) throw new Exception("Activity not found");
            return activity;
        }

    }
}