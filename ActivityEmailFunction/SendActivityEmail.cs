using ActivityEmailFunction.Models;
using Azure;
using Azure.Communication.Email;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;
using EmailAddress = Azure.Communication.Email.EmailAddress;

namespace ActivityEmailFunction;

public class SendActivityEmail
{
    private readonly ILogger<SendActivityEmail> _logger;

    public SendActivityEmail(ILogger<SendActivityEmail> logger)
    {
        _logger = logger;
    }

    [Function("SendActivityEmail")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
    {
        _logger.LogInformation("C# HTTP trigger function processed a request.");

        var activity = await req.ReadFromJsonAsync<ActivityDto>();
  
        var connectionString = Environment.GetEnvironmentVariable("Azure_Email_Connection");
        var emailClient = new EmailClient(connectionString);

        var emailMessage = new EmailMessage(senderAddress: "DoNotReply@4b1c3955-2b4c-4bf6-94b9-77f03c4c460a.au1.azurecomm.net",
            content: new EmailContent("Activity created")
            {
                PlainText = $"Activity created: {activity?.Title} created in {activity?.City}"
            },
            recipients: new EmailRecipients(
                new List<EmailAddress>
                {
                    new EmailAddress("suyogyataneja@gmail.com")
                }
        ));
        
        await emailClient.SendAsync(WaitUntil.Completed, emailMessage);
        // var client = new SendGridClient(Environment.GetEnvironmentVariable("SENDGRID_API_KEY"));
        // var from = new EmailAddress("suyogyattt@gmail.com");
        // var to = new EmailAddress("suyogyataneja@gmail.com");
        // var subject = "New Activity Created";
        // var content = $"Activity created: {activity?.Title} created in {activity?.City}";
        // var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
        //
        // var msg = MailHelper.CreateSingleEmail(from, to, subject, content, htmlContent);
        // var response = await client.SendEmailAsync(msg);
        //
        
        return new OkObjectResult("Email sent successfully");
    }
}
