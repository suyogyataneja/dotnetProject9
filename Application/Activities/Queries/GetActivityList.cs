using Domain;
using MediatR;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
  // this is how we create mediator query  


  // query receives a request and returns a response from the handler.
  public class Query : IRequest<List<Activity>>
  {
  }

  public class Handler(AppDbContext context,ILogger<GetActivityList> logger) : IRequestHandler<Query, List<Activity>>
  {
      // private IRequestHandler<Query, List<Activity>> _requestHandlerImplementation;
      public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {
          
          logger.LogInformation("GetActivityList Query");
          return await context.Activities.ToListAsync(cancellationToken);
      }
  }

}