

---

# 🚀 Reactivities — Full-Stack CRUD Application

(.NET 9 API + React + React Query)

Reactivities is a modern full-stack demo application showcasing a complete CRUD workflow using enterprise-level architecture and best practices.

It demonstrates clean backend architecture, modern React patterns, authentication with Identity, and CI/CD automation.

---

 
# Reactivities — Full-Stack CRUD App (.NET 8 API + React + React Query)

Reactivities is a full-stack demo application that demonstrates a modern CRUD workflow using:
also hostinv 
	•	 .NET 8 Web API with Clean Architecture principles (CQRS, Mediator, AutoMapper, EF Core)
	•	 React (Vite + TypeScript) for a responsive UI
	•	 React Query for efficient server state management
	•	 SQL Server as the backend database
	•	 xUnit + FluentAssertions for unit testing API behavior
	- 	 Implement React Router

This project is ideal for developers learning enterprise-level patterns such as:
	•	Domain-driven design (DDD)
	•	Separation of concerns between Domain, Application, API, and Infrastructure
	•	API-first development using RESTful endpoints
	•	React state management best practices using React Query


This project is ideal for developers learning enterprise-level patterns such as:
	•	Domain-driven design (DDD)
	•	Separation of concerns between Domain, Application, API, and Infrastructure
	•	API-first development using RESTful endpoints
	•	React state management best practices using React Query

# BACKEND


# VALIDATION
- 	Used Fluent Validation for Validation of Dtos.
- 	Added and Exception Middleware which converts the exceptions thrown deep in the application layer into consistent HTTP Responses.
- 	In my architecture, the validation happens in the MediatR pipeline and business logic lives in Application layer. HTTP concerns live om API layer.
- 	Without middleware : the app returns 500 error or might return inconsistent error responses.
-   With MiddleWare : - await next(context) wraps the entire request pipeline which includes- controllers, MedtiatR handlers, ValidationBehaviour. So if any of them throws an exception the middleware sees it.
-   				  - catch (ValidatonException ex) catches errors from ValidationBehaviour and not from controllers.
- 					  - context.Response.StatusCode = 400; -- here we are explicitly saying - "This was a client error not a server error"
FLow is as follows:

 HTTP
 ↓
Controller
 ↓
MediatR
 ↓
ValidationBehavior  ← throws
 ↓
Handler

Note - Controllers never see the exception.only middleware can catch it.

Middleware is used to translate application level exceptions into HTTP-level responses in a centralised and consistent way.


# CLEAN ARCHITECTURE

MAJOR FLAW IN MY SYSTEM IS that - ai am installing Microsoft.AspNetCore.Identity.EntityFrameworkCore in my Domain project which is against the clean architecture but I am doing it to reduce complexity.
Note: ASP.NET Core Identity should NOT live in the Domain layer. It belongs in the Infrastructure layer

In ideal scenario.....Your Domain layer should contain:
	•	Entities
	•	Value Objects
	•	Domain logic
	•	Business rules

It should NOT depend on:
	•	ASP.NET Core
	•	EF Core
	•	Identity
	•	Databases

This project uses ASP.NET Core Identity with Entity Framework Core for authentication and authorization.

Identity Schema & Runtime Configuration

The database already contains the standard ASP.NET Core Identity tables:
	•	AspNetUsers
	•	AspNetRoles
	•	AspNetUserRoles
	•	AspNetUserClaims
	•	AspNetRoleClaims
	•	AspNetUserLogins
	•	AspNetUserTokens

Even when these tables already exist, ASP.NET Core Identity must still be explicitly configured at runtime to enable authentication and authorization.

For this reason, Identity services are registered in the application startup using:
	•	AddIdentity<TUser, TRole>()
	•	AddEntityFrameworkStores<AppDbContext>()
	•	AddDefaultTokenProviders()

This ensures:
	•	UserManager and SignInManager are available via DI
	•	Password and security options are enforced
	•	[Authorize], role-based, and claims-based authorization work correctly
	•	Identity integrates properly with the existing database schema

Note: Existing database tables do not automatically configure Identity at runtime.
Persistence and runtime behavior are separate concerns.

# FRONT END

Using Axios to fetch data from backend.
Using MATERIAL UI to design the react components.

UI
Material UI library  has been used.

PROJECT STRUCTURE
Group by Feature/Routes


Components used :

App
NavBar-  AppBar
Activity Dashboard - Grid(Material UI), ActivitList 
Activity Card - Card, CardContent, CardActions, Chip, Button, Typography

NavBar-  AppBar
Activity Dashboard - Grid(Material UI), ActivitList 
Activity Card - Card, CardContent, CardActions, Chip, Button, Typography
Activity Form - Paper, Typography, Box, TextField, Button
# CI/CD
This project uses Azure DevOps Pipelines for CI.

The pipeline:
- Restores & builds the .NET API
- Builds the React frontend
- Is designed to The pipeline:
- Restores & builds the .NET API
- Builds the React frontend
- Is designed to support parallel jobs once hosted parallelism is available
- CI/CD is implemented on azure devops and github actions.
  
- added a claude.md file(Claude code has info related to architecture, coding style etc)
- Use Azure Functions to generate events. A email is sent when a new activity is created.
- Azure functions created in Portal
- Create a email alert when a new activity is created which is done using Azure functions.

Improvements I am working on right now is Adding Azure Service Bus to send messages in my project:

 ---
  What You Have Today

  When a user creates a new activity, your flow is:

  User creates activity
      → Create.cs handler saves to DB
      → Raises ActivityCreatedEvent (MediatR domain event)
      → ActivityCreatedEventHandler catches it
      → Makes a direct HTTP POST to your Azure Function
      → Azure Function does something with that activity data (e.g., sends a notification email, logs it, etc.)

  This works, but the HTTP call in ActivityCreatedEventHandler.cs is synchronous coupling — your API is directly calling the Azure Function and waiting for a response.

  ---
  The Problem With Direct HTTP

  Think about what happens in these real-world scenarios:

  1. Azure Function is down for maintenance — the HTTP call fails, the event is lost, no one gets notified. Your handler silently swallows it (you have no retry logic).
  2. Azure Function is slow — your API handler is blocked waiting for the Function to respond. The user who created the activity is staring at a spinner while an email is being composed somewhere in Azure.
  3. You want to add more reactions to "activity created" — say you also want to send a push notification AND update a search index AND log analytics. Now your handler makes 3 HTTP calls in sequence. If the second one fails, did the
  first one already fire? Do you roll back? It gets messy fast.                                                                                                                                                                          
  4. Spike in traffic — 50 users create activities at the same time. Your API fires 50 HTTP calls simultaneously to the Function, which might throttle or crash. There's no backpressure.
                                                                                                                                                                                                                                         
  ---             
  What Azure Service Bus Solves                                                                                                                                                                                                          
                                                                                                                                                                                                                                         
  Service Bus is a message queue that sits between your API and the Azure Function. Instead of calling the Function directly, you drop a message onto the queue and walk away.
                                                                                                                                                                                                                                         
  BEFORE (what you have):
    API Handler → HTTP POST → Azure Function                                                                                                                                                                                             
    - Coupled, fragile, blocking                                                                                                                                                                                                         
   
  AFTER (with Service Bus):                                                                                                                                                                                                              
    API Handler → publish message → Service Bus Queue → Azure Function picks it up
    - Decoupled, resilient, non-blocking                                                                                                                                                                                                 
   
---

## 💡 What Azure Service Bus Solves

Service Bus is a message queue that sits between your API and the Azure Function. Instead of calling the Function directly, you drop a message onto the queue and walk away.

---

### ❌ BEFORE (what you have)

API Handler → HTTP POST → Azure Function  
- Coupled, fragile, blocking  

---

### ✅ AFTER (with Service Bus)

API Handler → publish message → Service Bus Queue → Azure Function picks it up  
- Decoupled, resilient, non-blocking  

---

## 🔄 What Changes

| Problem | How Service Bus Fixes It |
|--------|--------------------------|
| Function is down | Messages queue up and wait. When the Function recovers, it processes them all. Nothing is lost. |
| Function is slow | Your API doesn't care — it publishes and returns immediately. The user sees instant response. |
| Multiple consumers | Use a Service Bus Topic instead of a Queue. One "activity created" message triggers email, push notification, and analytics — each with its own independent subscription. If one fails, the others still work. |
| Traffic spikes | The queue absorbs the burst. The Function processes messages at its own pace. No overload. |
| Failed processing | Built-in retry. If the Function crashes mid-processing, the message becomes visible again and gets reprocessed. After max retries, it goes to a dead-letter queue where you can inspect and replay it. |

---                                                                                                                                                                                                                      
  The Use Case In Your App
                                                                                                                                                                                                                                         
  Your Reactivities app is a social activity platform. Think about all the things that should happen when an activity is created, edited, cancelled, or when someone joins:
                                                                                                                                                                                                                                         
  Activity Created:
  - Email followers of the host: "John created a new activity: Beach Volleyball"                                                                                                                                                         
  - Send push notifications to nearby users                                                                                                                                                                                              
  - Index the activity for search
                                                                                                                                                                                                                                         
  Activity Cancelled:
  - Email all attendees: "Beach Volleyball on Saturday has been cancelled"                                                                                                                                                               
  - Update calendar integrations                                                                                                                                                                                                         
  - Log for analytics           
                                                                                                                                                                                                                                         
  User Joins an Activity:
  - Notify the host: "Sarah is attending your event"                                                                                                                                                                                     
  - Update recommendation engine                    
                                                                                                                                                                                                                                         
  Each of these is a side effect — it shouldn't block the main operation and it shouldn't fail silently. That's exactly what a message broker is for.                                                                                    
                                                                                                                                                                                                                                         
  ---                                                                                                                                                                                                                                    
  What Changes In Your Code                                                                                                                                                                                                              
                                                                                                                                                                                                                                         
  Your ActivityCreatedEventHandler goes from this:
                                                                                                                                                                                                                                         
  // Direct HTTP call — coupled, fragile
  await _httpClient.PostAsJsonAsync(_functionUrl, payload, cancellationToken);                                                                                                                                                           
   
  To this:                                                                                                                                                                                                                               
                  
  // Publish to Service Bus — decoupled, resilient
  await _serviceBusClient.SendMessageAsync(new ServiceBusMessage(JsonSerializer.Serialize(payload)));
                                                                                                                                                                                                                                         
  And your Azure Function changes its trigger from HTTP to Service Bus:                                                                                                                                                                  
                                                                                                                                                                                                                                         
  // BEFORE: HTTP trigger — must be called explicitly                                                                                                                                                                                    
  [Function("OnActivityCreated")]                                                                                                                                                                                                        
  public async Task Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
                                                                                                                                                                                                                                         
  // AFTER: Service Bus trigger — fires automatically when a message arrives
  [Function("OnActivityCreated")]                                                                                                                                                                                                        
  public async Task Run([ServiceBusTrigger("activity-created", Connection = "ServiceBusConnection")] string message)                                                                                                                     
   
  You delete the AzureFunctionUrl config, remove the HttpClient registration for the handler, and replace it with a Service Bus client. The Function no longer needs to be exposed as an HTTP endpoint at all.                           
                  
  ---                                                                                                                                                                                                                                    
  In Short        
                                                                                                                                                                                                                                         
  You're doing this because your API shouldn't care what happens after it saves the activity. It should announce "an activity was created" and move on. Azure Service Bus is the reliable, scalable announcement board that guarantees
  the message gets delivered — even if the listeners are temporarily unavailable.                                                                                                                                                        
⸻

Authentication & Identity

🧩 What This Project Uses — ASP.NET Core Identity
	•	Users are stored in your database (SQL Server via AppDbContext)
	•	Your application handles:
	•	Registration & login
	•	Password hashing
	•	Token generation (JWT / cookies)
	•	Fully self-managed authentication system

⸻

☁️ What Azure AD Is — Microsoft Entra ID
	•	Users are managed in Microsoft’s cloud directory
	•	Authentication happens via Microsoft’s login page
	•	Your app does not handle passwords
	•	Uses:
	•	OAuth 2.0
	•	OpenID Connect
	•	Common for enterprise / SSO scenarios

⸻

⚖️ Quick Comparison
                  
| Feature              | ASP.NET Core Identity        | Microsoft Entra ID |
|---------------------|-----------------------------|--------------------|
| User Storage        | Your database               | Microsoft cloud     |
| Authentication      | Your API                    | Microsoft login     |
| Password Handling   | You manage                  | Microsoft manages   |
| Protocols           | JWT / Cookies               | OAuth2 / OIDC       |
| Use Case            | Custom apps                 | Enterprise SSO      |
| Social Login        | Manual setup                | Built-in            |


 Simple Analogy
	•	ASP.NET Identity → You verify users yourself
	•	Entra ID → Microsoft verifies users for you

⸻

🔄 Extensibility
	•	Email & password (current setup)
	•	“Sign in with Microsoft” (future option)


Will be implementing Azure Redis cache and Azure Service Bus too.

 Creating Infrastructure project to add Caching
 
 Infrastructure references Application — because the CachingBehavior lives in Application and uses IDistributedCache (an abstraction). Infrastructure is where you configure the concrete Redis implementation for that abstraction. It 
  needs to see Application to know what it's wiring up.                                                                                                                                                                                  
                                                                                                                                                                                                                                         
  API references Infrastructure — because Program.cs (in API) needs to call AddInfrastructureServices() to register Redis into the DI container at startup. Without this reference, API can't see Infrastructure's extension method.     
                                                                                                                                                                                                                                         
  The dependency chain becomes:                                                                                                                                                                                                          
                  
  API → Infrastructure → Application → Domain

  Each layer only knows about the layer directly below it. Application never knows Redis exists — it only sees IDistributedCache. Infrastructure provides the Redis implementation. API wires it all together at startup.                


 In clean architecture:

  API (outermost)
    → Infrastructure
      → Application
        → Domain (innermost)

  Domain knows about nothing — it's pure business entities with zero dependencies.

  Application knows about Domain — it uses entities to implement business logic, but has no idea how data is stored or what external services exist. It only defines abstractions (interfaces).

  Infrastructure knows about Application — it provides concrete implementations for those abstractions (Redis for IDistributedCache, Cloudinary for IPhotoAccessor, SMTP for IEmailSender, etc.).

  API knows about Infrastructure — but only to wire everything together at startup. After that, it just dispatches MediatR requests.

  The core rule: inner layers never reference outer layers. If an inner layer needs something from the outside world, it defines an interface, and an outer layer implements it. That's dependency inversion.

Use Case for Infrastructure Project

                                                                                                                                                                                                                                       
  Step 1 — Create the Infrastructure project                                                                                                                                                                                             
   
  - Create a new class library: dotnet new classlib -n Infrastructure                                                                                                                                                                    
  - Add project references:
    - Infrastructure references Application                                                                                                                                                                                              
    - API references Infrastructure
                                                                                                                                                                                                                                         
  Step 2 — Add NuGet packages
                                                                                                                                                                                                                                         
  - Microsoft.Extensions.Caching.StackExchangeRedis → Infrastructure project                                                                                                                                                             
  - Microsoft.Extensions.Caching.Abstractions → Application project
                                                                                                                                                                                                                                         
  Step 3 — Create ICacheable marker interface

  - In Application/Core/ICacheable.cs                                                                                                                                                                                                    
   
  Step 4 — Create CachingBehavior pipeline                                                                                                                                                                                               
                  
  - In Application/Core/CachingBehavior.cs

  Step 5 — Create a DI extension method in Infrastructure                                                                                                                                                                                
   
  - In Infrastructure/DependencyInjection.cs — an AddInfrastructureServices(IConfiguration) extension method that calls AddStackExchangeRedisCache(...). This keeps Redis wiring out of Program.cs and inside the Infrastructure layer   
  where it belongs.
                                                                                                                                                                                                                                         
  Step 6 — Register in Program.cs

  - Call builder.Services.AddInfrastructureServices(builder.Configuration)                                                                                                                                                               
  - Register CachingBehavior as an open behavior alongside ValidationBehavior
                                                                                                                                                                                                                                         
  Step 7 — Add Redis connection string

  - Add to your configuration (user-secrets or appsettings.Development.json)                                                                                                                                                             
   
  Step 8 — Mark queries as cacheable                                                                                                                                                                                                     
                  
  - GetActivityList.Query and GetActivityDetails.Query implement ICacheable                                                                                                                                                              
   
  Step 9 — Invalidate cache on mutations                                                                                                                                                                                                 
                  
  - Inject IDistributedCache in Create/Edit/Delete handlers, remove stale keys after successful saves                                                                                                                                    
   
  Step 10 — Run Redis locally and test                                                                                                                                                                                                   
                  
  ---
  You can run redis locally or use Azure Cache for Redis.  

Logging - Serilog

Add unit tests for all endpoint using Xunit
Add test cases for front end too
  
