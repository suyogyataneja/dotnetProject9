 Reactivities — Full-Stack CRUD App (.NET 8 API + React + React Query)

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


**BACKEND
**

VALIDATION
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


CLEAN ARCHITECTURE

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

**FRONT END**

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

### CI/CD
This project uses Azure DevOps Pipelines for CI.

The pipeline:
- Restores & builds the .NET API
- Builds the React frontend
- Is designed to support parallel jobs once hosted parallelism is available









