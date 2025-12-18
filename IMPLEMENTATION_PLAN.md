# Plan d'Implémentation : TaskFlow.Infrastructure

Ce document détaille les étapes pour l'implémentation de la couche Infrastructure, incluant la persistance avec EF Core et l'authentification avec ASP.NET Core Identity.

### 1. Initialisation du Projet et des Dépendances

- **Tâche** : Créer le projet `TaskFlow.Infrastructure`, le lier à la solution, et ajouter les dépendances NuGet.
- **Commit** : `feat(infra): Initialize Infrastructure project and dependencies`
- **Détails** :
    - Créer un projet `classlib` nommé `TaskFlow.Infrastructure`.
    - Ajouter les références de projet vers `TaskFlow.Application` et `TaskFlow.Domain`.
    - Installer les packages NuGet :
        - `Microsoft.AspNetCore.Identity.EntityFrameworkCore`
        - `Microsoft.EntityFrameworkCore.SqlServer`
        - `Microsoft.EntityFrameworkCore.Design`
        - `Microsoft.Extensions.Configuration.Binder`

### 2. Intégration d'ASP.NET Core Identity

- **Tâche** : Adapter le domaine et le DbContext pour prendre en charge Identity.
- **Commit** : `feat(identity): Integrate ASP.NET Core Identity`
- **Détails** :
    - Mettre à jour `Domain/Users/ApplicationUser.cs` pour qu'il hérite de `IdentityUser<Guid>`.
    - Créer `Persistence/ApplicationDbContext.cs` héritant de `IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>`.

### 3. Configuration de la Persistance (EF Core)

- **Tâche** : Finaliser le DbContext et créer les configurations d'entités.
- **Commit** : `feat(persistence): Implement DbContext and entity configurations`
- **Détails** :
    - Implémenter `IUnitOfWork` dans `ApplicationDbContext`.
    - Ajouter le `DbSet<TaskAggregate>`.
    - Créer et appliquer les `IEntityTypeConfiguration<T>` pour `TaskAggregate` et `ApplicationUser`.

### 4. Implémentation des Repositories et Services

- **Tâche** : Créer les implémentations concrètes des abstractions de la couche Application.
- **Commit** : `feat(persistence): Implement repositories and services`
- **Détails** :
    - Implémenter `TaskRepository` et `UserRepository`.
    - Implémenter `AuthService` et `CurrentUserService`.

### 5. Configuration de l'Injection de Dépendances (DI)

- **Tâche** : Enregistrer tous les services de l'infrastructure dans le conteneur de DI de l'application.
- **Commit** : `feat(di): Configure dependency injection`
- **Détails** :
    - Créer la méthode d'extension `AddInfrastructureServices`.
    - Configurer `DbContext`, `Identity`, les repositories et les services.
    - Appeler la méthode d'extension dans `WebApi/Program.cs`.

### 6. Création de la Migration Initiale

- **Tâche** : Générer la migration EF Core qui créera le schéma de la base de données.
- **Commit** : `chore(ef): Add initial EF Core migration`
- **Détails** :
    - Ajouter la chaîne de connexion dans `appsettings.Development.json`.
    - Exécuter `dotnet ef migrations add InitialCreateWithIdentity`.

