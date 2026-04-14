using System.Net.Http.Json;
using Domain.Events;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.Activities.EventHandlers;

public class ActivityCreatedEventHandler : INotificationHandler<ActivityCreatedEvent>
{
    private readonly HttpClient _httpClient;
    private readonly string _functionUrl;

    public ActivityCreatedEventHandler(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _functionUrl = configuration["AzureFunctionUrl"]!;
    }

    public async Task Handle(ActivityCreatedEvent notification, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(_functionUrl)) return;

        var payload = new
        {
            notification.Activity.Id,
            notification.Activity.Title,
            notification.Activity.Date,
            notification.Activity.Category,
            notification.Activity.City,
            notification.Activity.Venue,
            notification.Activity.Description
        };

        await _httpClient.PostAsJsonAsync(_functionUrl, payload, cancellationToken);
    }
}