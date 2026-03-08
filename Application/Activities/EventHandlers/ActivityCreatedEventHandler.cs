using System.Net.Http.Json;
using Domain.Events;
using MediatR;

namespace Application.Activities.EventHandlers;

public class ActivityCreatedEventHandler :INotificationHandler<ActivityCreatedEvent>
{
    
    private readonly HttpClient _httpClient;
    
    public ActivityCreatedEventHandler(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task Handle(ActivityCreatedEvent notification, CancellationToken cancellationToken)
    {
        // throw new NotImplementedException();
        
        await _httpClient.PostAsJsonAsync("https://localhost:5001/api/activities", notification.Activity, cancellationToken);
    }
}