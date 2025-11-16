using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
  // this is how we create mediator query  
  public class  Query: IRequest<List<Activity>>
  {
   
  }

  public class Handler : IRequestHandler<Query, List<Activity>>
  {
    
    // this is traditional way of using contructor 
    private readonly AppDbContext _context;
    public Handler(AppDbContext context)
    {
      _context = context;
    }
    public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
    {
      // throw new NotImplementedException();
      return await _context.Activities.ToListAsync(cancellationToken);
    }
  }
}