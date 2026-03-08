using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using Domain.Events;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        
        public required CreateActivityDto ActivityDto { get; set; }
    }
    
    public class Handler(AppDbContext context, IMapper mapper, IMediator mediator) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            // await validator.ValidateAndThrowAsync(request, cancellationToken);
            var activity = mapper.Map<Activity>(request.ActivityDto);
            // context.Activities.Add(request.Activity);            
            context.Activities.Add(activity);           
            
            var result = await context.SaveChangesAsync(cancellationToken)>0;
            
            if(!result) return Result<string>.Failure("Failed to create activity ",400);
            // return request.Activity.Id;
            
            await mediator.Publish(new ActivityCreatedEvent(activity), cancellationToken);

            return Result<string>.Success(activity.Id);
        }
    }
}