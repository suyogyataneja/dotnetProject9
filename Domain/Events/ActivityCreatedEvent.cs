namespace Domain.Events;

public class ActivityCreatedEvent
{
    public Activity Activity { get; set; }

    public ActivityCreatedEvent(Activity activity)
    {
        Activity = activity;
    }
    
}