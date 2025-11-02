# ?? Guide de tests pour TaskFlow API

Ce guide présente des exemples de tests pour votre API TaskFlow, utiles pour l'apprentissage.

## ?? Types de tests

1. **Tests unitaires** : Testent les services et repositories isolément
2. **Tests d'intégration** : Testent l'API complète avec la base de données
3. **Tests manuels** : Via Swagger ou outils comme Postman/cURL

## ??? Configuration des tests (optionnel)

### Créer un projet de tests

```bash
dotnet new xunit -n TaskFlow.Tests
cd TaskFlow.Tests
dotnet add reference ../TaskFlow.Core/TaskFlow.Core.csproj
dotnet add reference ../TaskFlow.WebAPI/TaskFlow.WebAPI.csproj
dotnet add package Microsoft.EntityFrameworkCore.InMemory
dotnet add package Moq
dotnet add package FluentAssertions
```

## ?? Exemples de tests unitaires

### Test du service ToDoService (TaskFlow.Tests/Services/ToDoServiceTests.cs)

```csharp
using Microsoft.Extensions.Logging;
using Moq;
using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.Repositories;
using TaskFlow.Core.Domain.Services;
using Xunit;
using FluentAssertions;

namespace TaskFlow.Tests.Services;

public class ToDoServiceTests {
    private readonly Mock<IToDoRepository> _mockRepository;
    private readonly Mock<ILogger<ToDoService>> _mockLogger;
    private readonly ToDoService _service;

 public ToDoServiceTests() {
        _mockRepository = new Mock<IToDoRepository>();
        _mockLogger = new Mock<ILogger<ToDoService>>();
     _service = new ToDoService(_mockRepository.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task CreateAsync_ShouldCreateTodoSuccessfully() {
        // Arrange
        var description = "Tâche de test";
    var dueDate = DateTime.Today.AddDays(7);
        var isPriority = true;

  var expectedTodo = new ToDo(description) {
            Id = 1,
DueDate = dueDate,
            IsPriority = isPriority
    };

 _mockRepository
    .Setup(r => r.CreateAsync(It.IsAny<ToDo>()))
            .ReturnsAsync(expectedTodo);

     // Act
        var result = await _service.CreateAsync(description, dueDate, isPriority);

   // Assert
        result.Should().NotBeNull();
        result.Description.Should().Be(description);
result.DueDate.Should().Be(dueDate);
        result.IsPriority.Should().Be(isPriority);

   _mockRepository.Verify(
  r => r.CreateAsync(It.Is<ToDo>(t => t.Description == description)),
            Times.Once
        );
    }

 [Fact]
    public async Task GetByIdAsync_ShouldReturnTodo_WhenTodoExists() {
        // Arrange
  var todoId = 1;
        var expectedTodo = new ToDo("Tâche existante") { Id = todoId };

    _mockRepository
            .Setup(r => r.GetByIdAsync(todoId))
            .ReturnsAsync(expectedTodo);

 // Act
        var result = await _service.GetByIdAsync(todoId);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(todoId);
    result.Description.Should().Be("Tâche existante");
 }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNull_WhenTodoDoesNotExist() {
        // Arrange
     var todoId = 999;

      _mockRepository
  .Setup(r => r.GetByIdAsync(todoId))
      .ReturnsAsync((ToDo?)null);

   // Act
        var result = await _service.GetByIdAsync(todoId);

      // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task ToggleCompleteAsync_ShouldToggleIsCompletedFlag() {
   // Arrange
        var todoId = 1;
        var todo = new ToDo("Tâche à compléter") {
        Id = todoId,
          IsCompleted = false
        };

        _mockRepository
        .Setup(r => r.GetByIdAsync(todoId))
     .ReturnsAsync(todo);

        _mockRepository
            .Setup(r => r.UpdateAsync(It.IsAny<ToDo>()))
      .ReturnsAsync(todo);

        // Act
 var result = await _service.ToggleCompleteAsync(todoId);

   // Assert
        result.Should().NotBeNull();
        result!.IsCompleted.Should().BeTrue();
      result.UpdatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }

    [Fact]
    public async Task ArchiveAsync_ShouldSetIsArchivedToTrue() {
    // Arrange
        var todoId = 1;
        var todo = new ToDo("Tâche à archiver") {
     Id = todoId,
    IsArchived = false
        };

        _mockRepository
            .Setup(r => r.GetByIdAsync(todoId))
    .ReturnsAsync(todo);

        _mockRepository
            .Setup(r => r.UpdateAsync(It.IsAny<ToDo>()))
  .ReturnsAsync(todo);

        // Act
        var result = await _service.ArchiveAsync(todoId);

  // Assert
        result.Should().BeTrue();
        todo.IsArchived.Should().BeTrue();

      _mockRepository.Verify(
            r => r.UpdateAsync(It.Is<ToDo>(t => t.IsArchived == true)),
       Times.Once
        );
    }
}
```

### Test du repository ToDoRepository (TaskFlow.Tests/Repositories/ToDoRepositoryTests.cs)

```csharp
using Microsoft.EntityFrameworkCore;
using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.Enums;
using TaskFlow.Core.Infrastructure.Repositories;
using Xunit;
using FluentAssertions;

namespace TaskFlow.Tests.Repositories;

public class ToDoRepositoryTests : IDisposable {
    private readonly TaskFlowDbContext _context;
    private readonly ToDoRepository _repository;

    public ToDoRepositoryTests() {
 var options = new DbContextOptionsBuilder<TaskFlowDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new TaskFlowDbContext(options);
        _repository = new ToDoRepository(_context);
    }

    [Fact]
    public async Task CreateAsync_ShouldAddTodoToDatabase() {
  // Arrange
        var todo = new ToDo("Nouvelle tâche");

        // Act
    var result = await _repository.CreateAsync(todo);

   // Assert
    result.Id.Should().BeGreaterThan(0);
     _context.ToDos.Should().Contain(result);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnCorrectTodo() {
      // Arrange
        var todo = new ToDo("Tâche test") { IsPriority = true };
        await _repository.CreateAsync(todo);

        // Act
        var result = await _repository.GetByIdAsync(todo.Id);

        // Assert
        result.Should().NotBeNull();
        result!.Description.Should().Be("Tâche test");
        result.IsPriority.Should().BeTrue();
    }

    [Fact]
    public async Task GetByIdAsync_ShouldNotReturnArchivedTodos() {
        // Arrange
        var todo = new ToDo("Tâche archivée") { IsArchived = true };
  await _repository.CreateAsync(todo);

        // Act
     var result = await _repository.GetByIdAsync(todo.Id);

        // Assert
   result.Should().BeNull();
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnPagedResults() {
   // Arrange
 for (int i = 1; i <= 15; i++) {
       await _repository.CreateAsync(new ToDo($"Tâche {i}"));
        }

   // Act
        var (items, totalCount) = await _repository.GetAllAsync(
  skip: 0,
       take: 10
 );

        // Assert
        items.Should().HaveCount(10);
        totalCount.Should().Be(15);
    }

  [Fact]
    public async Task GetAllAsync_ShouldFilterByPriority() {
     // Arrange
    await _repository.CreateAsync(new ToDo("Prioritaire 1") { IsPriority = true });
        await _repository.CreateAsync(new ToDo("Prioritaire 2") { IsPriority = true });
        await _repository.CreateAsync(new ToDo("Normal"));

   // Act
        var (items, totalCount) = await _repository.GetAllAsync(
         isPriority: true,
            take: 10
        );

    // Assert
      items.Should().HaveCount(2);
    items.Should().OnlyContain(t => t.IsPriority);
    }

    [Fact]
    public async Task GetAllAsync_ShouldSortByDueDateCorrectly() {
        // Arrange
        var today = DateTime.Today;
        await _repository.CreateAsync(new ToDo("Sans date"));
        await _repository.CreateAsync(new ToDo("Dans 7 jours") { DueDate = today.AddDays(7) });
      await _repository.CreateAsync(new ToDo("Demain") { DueDate = today.AddDays(1) });

        // Act
      var (items, _) = await _repository.GetAllAsync(
            sortBy: ToDoSortBy.DueDate,
      take: 10
        );

        // Assert
        var list = items.ToList();
        list[0].Description.Should().Be("Demain");
     list[1].Description.Should().Be("Dans 7 jours");
   list[2].Description.Should().Be("Sans date");
    }

    [Fact]
    public async Task UpdateAsync_ShouldModifyExistingTodo() {
      // Arrange
        var todo = new ToDo("Description originale");
        await _repository.CreateAsync(todo);

        // Act
        todo.Description = "Description modifiée";
        var result = await _repository.UpdateAsync(todo);

        // Assert
   result.Should().NotBeNull();
        result!.Description.Should().Be("Description modifiée");

  var fromDb = await _repository.GetByIdAsync(todo.Id);
        fromDb!.Description.Should().Be("Description modifiée");
    }

    public void Dispose() {
    _context.Database.EnsureDeleted();
   _context.Dispose();
    }
}
```

## ?? Tests d'intégration avec WebApplicationFactory

### Test du contrôleur (TaskFlow.Tests/Controllers/ToDoControllerTests.cs)

```csharp
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using TaskFlow.WebAPI.Models.ToDo;
using Xunit;
using FluentAssertions;

namespace TaskFlow.Tests.Controllers;

public class ToDoControllerTests : IClassFixture<WebApplicationFactory<Program>> {
    private readonly HttpClient _client;

    public ToDoControllerTests(WebApplicationFactory<Program> factory) {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_ShouldReturnPagedResponse() {
        // Act
        var response = await _client.GetAsync("/api/todos?page=1&pageSize=10");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var result = await response.Content.ReadFromJsonAsync<PagedResponse<ToDoItem>>();
      result.Should().NotBeNull();
        result!.Items.Should().NotBeEmpty();
  result.Page.Should().Be(1);
        result.PageSize.Should().Be(10);
    }

  [Fact]
    public async Task Create_WithValidData_ShouldReturnCreated() {
     // Arrange
        var command = new CreateToDo(
   Description: "Nouvelle tâche de test",
     DueDate: DateTime.Today.AddDays(7),
   IsPriority: true
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/todos", command);

        // Assert
     response.StatusCode.Should().Be(HttpStatusCode.Created);
    response.Headers.Location.Should().NotBeNull();

        var result = await response.Content.ReadFromJsonAsync<ToDoDetails>();
        result.Should().NotBeNull();
        result!.Description.Should().Be(command.Description);
   result.IsPriority.Should().BeTrue();
    }

    [Fact]
    public async Task Create_WithInvalidData_ShouldReturnBadRequest() {
        // Arrange
        var command = new CreateToDo(
 Description: "", // Invalid: empty
   DueDate: null,
            IsPriority: false
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/todos", command);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task GetById_WithExistingId_ShouldReturnTodo() {
      // Arrange - Create a todo first
        var createCommand = new CreateToDo("Tâche pour test GetById");
        var createResponse = await _client.PostAsJsonAsync("/api/todos", createCommand);
        var created = await createResponse.Content.ReadFromJsonAsync<ToDoDetails>();

        // Act
        var response = await _client.GetAsync($"/api/todos/{created!.Id}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

      var result = await response.Content.ReadFromJsonAsync<ToDoDetails>();
        result.Should().NotBeNull();
        result!.Id.Should().Be(created.Id);
    }

    [Fact]
    public async Task GetById_WithNonExistingId_ShouldReturnNotFound() {
        // Act
        var response = await _client.GetAsync("/api/todos/99999");

        // Assert
   response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
public async Task ToggleComplete_ShouldChangeCompletionStatus() {
        // Arrange
        var createCommand = new CreateToDo("Tâche à compléter");
        var createResponse = await _client.PostAsJsonAsync("/api/todos", createCommand);
        var created = await createResponse.Content.ReadFromJsonAsync<ToDoDetails>();

        // Act
        var response = await _client.PatchAsync(
       $"/api/todos/{created!.Id}/toggle-complete",
            null
        );

      // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var result = await response.Content.ReadFromJsonAsync<ToDoDetails>();
        result!.IsCompleted.Should().BeTrue();
    }

    [Fact]
    public async Task Archive_ShouldReturnNoContent() {
        // Arrange
   var createCommand = new CreateToDo("Tâche à archiver");
      var createResponse = await _client.PostAsJsonAsync("/api/todos", createCommand);
        var created = await createResponse.Content.ReadFromJsonAsync<ToDoDetails>();

      // Act
var response = await _client.DeleteAsync($"/api/todos/{created!.Id}");

  // Assert
  response.StatusCode.Should().Be(HttpStatusCode.NoContent);

  // Verify it's archived (not found)
        var getResponse = await _client.GetAsync($"/api/todos/{created.Id}");
      getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
```

## ?? Tests manuels avec cURL

### Créer une tâche

```bash
curl -X POST https://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Apprendre les tests",
    "dueDate": "2024-12-31",
 "isPriority": true
  }'
```

### Récupérer toutes les tâches (page 1)

```bash
curl https://localhost:5001/api/todos?page=1&pageSize=10
```

### Récupérer une tâche par ID

```bash
curl https://localhost:5001/api/todos/1
```

### Mettre à jour la description

```bash
curl -X PUT https://localhost:5001/api/todos/1/description \
  -H "Content-Type: application/json" \
  -d '{"value": "Description modifiée"}'
```

### Basculer la priorité

```bash
curl -X PATCH https://localhost:5001/api/todos/1/toggle-priority
```

### Archiver une tâche

```bash
curl -X DELETE https://localhost:5001/api/todos/1
```

## ?? Scenarios de tests

### Scénario 1 : Création et gestion d'une tâche

1. Créer une tâche prioritaire
2. Vérifier qu'elle apparaît dans la liste
3. Modifier sa description
4. Marquer comme complétée
5. Archiver

### Scénario 2 : Filtres et pagination

1. Créer 15 tâches (5 prioritaires, 10 normales)
2. Filtrer par priorité
3. Paginer (10 par page)
4. Vérifier le nombre total

### Scénario 3 : Validation des données

1. Tenter de créer avec description vide ? 400
2. Tenter de créer avec description de 201 caractères ? 400
3. Tenter d'accéder à un ID inexistant ? 404
4. Créer avec des données valides ? 201

## ?? Exercices pour les étudiants

### Niveau débutant

1. Écrire un test pour vérifier qu'une tâche créée a toujours `IsCompleted = false`
2. Tester que `TogglePriority` change bien le statut
3. Vérifier que la pagination retourne le bon nombre d'éléments

### Niveau intermédiaire

4. Tester le tri par date d'échéance avec plusieurs tâches
5. Tester les filtres combinés (prioritaire ET complétée)
6. Écrire un test de performance (créer 1000 tâches)

### Niveau avancé

7. Implémenter des tests avec Moq pour tous les services
8. Créer une suite de tests d'intégration complète
9. Ajouter des tests de charge avec Artillery ou k6

## ?? Ressources

- [xUnit Documentation](https://xunit.net/)
- [Moq Documentation](https://github.com/moq/moq4)
- [FluentAssertions](https://fluentassertions.com/)
- [Testing in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/test/)

## ? Bonnes pratiques

1. **AAA Pattern** : Arrange, Act, Assert
2. **Un test = un comportement** : Tests simples et focalisés
3. **Noms descriptifs** : `MethodName_Scenario_ExpectedResult`
4. **Tests isolés** : Chaque test doit être indépendant
5. **Données de test claires** : Utiliser des valeurs significatives
6. **Cleanup** : Nettoyer après les tests (IDisposable)

Bonne chance avec vos tests ! ??
