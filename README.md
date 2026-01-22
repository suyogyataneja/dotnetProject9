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
	•	Domain-driven design (DDD)




Backend

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
