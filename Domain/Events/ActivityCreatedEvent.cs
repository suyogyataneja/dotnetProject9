using MediatR;

namespace Domain.Events;

public class ActivityCreatedEvent : INotification
{
    public Activity Activity { get; set; }

    public ActivityCreatedEvent(Activity activity)
    {
        Activity = activity;
    }
    
}