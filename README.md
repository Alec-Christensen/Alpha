# Alpha Portal

A project management portal built with ASP.NET Core MVC. Authenticated users can create, view, edit, and delete client projects. Each project tracks a name, client, description, start/end dates, optional budget, and a status (Started / Completed).

There is no role separation — any registered user can manage any project. This is an internal-facing tool, not a multi-tenant SaaS.

## Live Demo
https://alpha-production-954b.up.railway.app

## Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c2e7114a-e861-410b-877b-13125d8f8eca" /></td>
    <td><img src="https://github.com/user-attachments/assets/e267d053-2ff6-4057-bd27-c148286149e7" /></td>
  </tr>
</table>

---

## Solution structure

```
Alpha/
├── Data/           Class library — persistence layer
│   ├── Entities/   Domain entities (Project)
│   ├── Migrations/ EF Core migration history
│   └── ApplicationDbContext.cs
└── WebApp/         ASP.NET Core MVC application
    ├── Controllers/
    ├── Services/   IProjectService / ProjectService
    ├── Views/
    └── Areas/Identity/  Scaffolded Identity pages
```

`Data` is a separate class library so the persistence layer has no dependency on `Microsoft.AspNetCore.*`. The web project references `Data`; `Data` knows nothing about HTTP. `ApplicationDbContext` extends `IdentityDbContext`, so Identity tables and application tables live in the same database and share the same migration history.

The controller delegates all database work to `IProjectService`, which is registered as `Scoped` and injected. This keeps the controller thin and the data access testable in isolation.

---

## Tech stack

| Layer | Package | Version |
|---|---|---|
| Runtime | .NET | 9.0 |
| Web framework | ASP.NET Core MVC | 9.0 |
| ORM | Entity Framework Core | 9.0.4 |
| Database provider | Npgsql.EntityFrameworkCore.PostgreSQL | 9.0.4 |
| Auth | ASP.NET Core Identity + EF stores | 9.0.4 |
| Icons | Bootstrap Icons (CDN) | 1.11.3 |
| Icons | Font Awesome (CDN) | 6.7.2 |

---

## Running locally

### 1. Start PostgreSQL via Docker

```bash
docker run -d \
  --name alpha-postgres \
  -e POSTGRES_PASSWORD=localdev123 \
  -e POSTGRES_DB=AlphaPortalDb \
  -p 5433:5432 \
  postgres:16
```

Port 5433 on the host maps to 5432 inside the container to avoid colliding with a local Postgres instance.

### 2. Set the connection string

In `WebApp/appsettings.Development.json` (or via user secrets), add:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5433;Database=AlphaPortalDb;Username=postgres;Password=localdev123"
  }
}
```

### 3. Apply migrations

```bash
cd Data
dotnet ef database update --startup-project ../WebApp
```

### 4. Run

```bash
cd WebApp
dotnet run
```

The app starts at `https://localhost:5001`. Register an account to log in — email confirmation is disabled.

---

## Production (Railway)

The connection string is not stored in source. Railway injects it as an environment variable:

```
ConnectionStrings__DefaultConnection=<Railway Postgres connection string>
```

ASP.NET Core's configuration system maps `__` to `:`, so this is picked up automatically by `GetConnectionString("DefaultConnection")`. No code changes are needed between environments.


---

## Notes

The project filter (All / Started / Completed) is applied in-memory in the view layer after fetching all rows. This is fine at the current data volume but would need to move to a `WHERE` clause if the projects table grows.

The edit modal is loaded via a fetch to `GET /projects/edit-project/{id}`, which returns a partial view. The add modal is static markup rendered on page load.

---

This was built as a school project at Nackademin to demonstrate a working MVC application with authentication, CRUD operations, and a clean service abstraction layer.
