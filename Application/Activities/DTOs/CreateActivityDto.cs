using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTOs;

public class CreateActivityDto
{
    [Required]
    public string Title { get; set; }  // anything required cant be null
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string Category { get; set; }
    //location props
    [Required]
    public string City { get; set; }
    [Required]
    public string Venue { get; set; }
    [Required]
    public double  Latitude { get; set; }
    [Required]
    public double  Longitude { get; set; }

}