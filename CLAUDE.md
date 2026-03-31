# Reactivities — CLAUDE.md

## Project Overview

Reactivities is a full-stack social activity planning application built with **ASP.NET Core (.NET 9)** on the backend and **React (TypeScript)** on the frontend. Users can create, browse, attend, and manage social activities, with real-time features powered by SignalR.

---

## Architecture

The solution follows **Clean Architecture** principles, separated into distinct layers with a strict dependency rule: outer layers depend on inner layers, never the reverse.

```
Reactivities/
├── API/                  # ASP.NET Core Web API — entry point, controllers, SignalR hubs, middleware
├── Application/          # Use cases — CQRS handlers, DTOs, validators, MappingProfiles
├── Domain/               # Core entities and domain events — no dependencies on other layers
├── Persistence/          # EF Core DbContext, migrations, data seeding
├── Infrastructure/       # External services (email, photos via Cloudinary, security tokens)
└── client-app/           # React + TypeScript frontend (Vite)
```

---

## Key Patterns

### CQRS with MediatR

All application logic is implemented as **Commands** and **Queries** using [MediatR](https://github.com/jbogard/MediatR). There are no service classes — business logic lives exclusively in handlers.

**Folder convention inside `Application/`:**

```
Application/
└── Activities/
    ├── List.cs          # Query + Handler
    ├── Details.cs       # Query + Handler
    ├── Create.cs        # Command + Handler
    ├── Edit.cs          # Command + Handler
    ├── Delete.cs        # Command + Handler
    └── ActivityDto.cs   # DTO returned to API
```

**Query example:**

```csharp
public class List
{
    public class Query : IRequest<Result<List<ActivityDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken ct)
        {
            var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(ct);

            return Result<T>.Success(activities);
        }
    }
}
```

**Command example:**

```csharp
public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context) => _context = context;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken ct)
        {
            _context.Activities.Add(request.Activity);
            var result = await _context.SaveChangesAsync(ct) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to create activity");
        }
    }
}
```

### Result Pattern

All handlers return `Result<T>` — a wrapper that avoids throwing exceptions for expected failures (e.g., not found, unauthorised).

```csharp
public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T Value { get; set; }
    public string Error { get; set; }

    public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };
    public static Result<T> Failure(string error) => new() { IsSuccess = false, Error = error };
}
```

API controllers use a base `BaseApiController` that unwrites `Result<T>` into the appropriate HTTP response via `HandleResult()`.

### AutoMapper

Mapping between domain entities and DTOs is done with **AutoMapper**. Profiles live in `Application/Core/MappingProfiles.cs`. Prefer `ProjectTo<>()` in queries to push projection to the database.

### Validation

Command validation is done with **FluentValidation**, wired into MediatR's pipeline via a `ValidationBehavior<TRequest, TResponse>` pipeline behaviour registered in `Application/Core/`.

### Pagination

Paginated queries use `PagingParams` (passed as query string) and return `PagedList<T>`. Pagination metadata is returned in a custom `Pagination` response header.

---

## Domain Entities

Core entities live in `Domain/` and have no external dependencies.

| Entity | Notes |
|---|---|
| `Activity` | Central aggregate — has date, category, city, venue |
| `AppUser` | Extends `IdentityUser` — display name, bio, photos |
| `ActivityAttendee` | Join table — links users to activities, tracks IsHost |
| `Photo` | Cloudinary-backed user photos |
| `Comment` | Activity comments sent via SignalR |
| `UserFollowing` | Self-referencing follower/following relationship |

---

## API Layer

- Controllers are thin — they dispatch MediatR requests and call `HandleResult()`.
- Authentication uses **JWT Bearer tokens** + **ASP.NET Core Identity**.
- Refresh tokens are stored on the `AppUser` entity.
- Real-time comments use a **SignalR** hub at `API/Hubs/ChatHub.cs`.
- Photos are uploaded to **Cloudinary** via `Infrastructure/Photos/PhotoAccessor.cs`.

---

## Persistence

- **EF Core** with SQLite for development, PostgreSQL for production.
- `DataContext` is in `Persistence/`.
- Migrations: `dotnet ef migrations add <Name> -p Persistence -s API`
- Seeding is done via `Persistence/Seed.cs`, called in `Program.cs` at startup.

---

## Common Commands

```bash
# Run the API (from solution root)
cd API && dotnet run

# Apply migrations / recreate DB
dotnet ef database update -p Persistence -s API

# Add a migration
dotnet ef migrations add <MigrationName> -p Persistence -s API

# Run the React client
cd client-app && npm run dev

# Restore all packages
dotnet restore

# Build solution
dotnet build
```

---

## Adding a New Feature — Checklist

When adding a new use case, follow this order:

1. **Domain** — add or update entities if needed.
2. **Persistence** — add `DbSet`, relationships, or a migration.
3. **Application** — create a new folder under `Application/<Feature>/` with `Query.cs` or `Command.cs` files. Add a DTO and/or FluentValidation validator as needed.
4. **API** — add a controller action that sends the MediatR request and returns `HandleResult(...)`.
5. **Client** — add MobX store action + API agent call + UI component.

Do **not** put business logic in controllers or the `DbContext`. All logic belongs in MediatR handlers.

---

## Frontend (client-app)

The React client uses:

- **TypeScript**
- **MobX** for state management (stores in `src/app/stores/`)
- **Axios** for HTTP (`src/app/api/agent.ts`)
- **React Router v6** for routing
- **Semantic UI React** for components
- **Formik + Yup** for forms and validation

---

## Environment & Configuration

- API settings: `API/appsettings.json` + `API/appsettings.Development.json` (gitignored secrets)
- Required secrets (set via `dotnet user-secrets` locally):
  - `TokenKey` — JWT signing key
  - `Cloudinary:CloudName`, `Cloudinary:ApiKey`, `Cloudinary:ApiSecret`
  - `EmailSender:*` (if email features are enabled)

---

## Code Style Conventions

- Use `async/await` throughout; always pass `CancellationToken` down to EF Core calls.
- Prefer `var` for local variables when the type is obvious.
- Handler classes are always `sealed`.
- DTOs are record types where possible.
- No static helper classes — inject dependencies via the constructor.
- Keep controllers free of logic; keep handlers free of HTTP concepts.