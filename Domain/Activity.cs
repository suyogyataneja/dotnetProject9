namespace Domain;

public class Activity
{
    
    public string Id { get; set; } = Guid.NewGuid().ToString(); //strings are easier to work than using guid but either works

    public required string Title { get; set; }  // anything required cant be null

    public DateTime Date { get; set; }

    public required string Description { get; set; }
    public required string Category { get; set; }

    public bool  IsCancelled { get; set; }
    
    //location props
    public required string City { get; set; }
    public required string Venue { get; set; }

    public double  Latitude { get; set; }
    public double  Longitude { get; set; }
}