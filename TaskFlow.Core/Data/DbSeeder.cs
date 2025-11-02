using TaskFlow.Core.Domain.Entities;

namespace TaskFlow.Core.Data;

public static class DbSeeder {

    private static ToDo CreateTodo(
        string description,
        int daysOffset = 0,
        bool isPriority = false,
        bool isCompleted = false,
        bool isArchived = false,
        int? dueDaysOffset = null) {

        return new(description) {
            CreatedAt = DateTime.UtcNow.AddDays(daysOffset),
            DueDate = dueDaysOffset.HasValue ? DateTime.UtcNow.AddDays(dueDaysOffset.Value) : null,
            IsPriority = isPriority,
            IsCompleted = isCompleted,
            IsArchived = isArchived
        };
    }

    private static IEnumerable<ToDo> InitialTodos => [
        CreateTodo("Promener le chien", 0, true, false, false, 0),
        CreateTodo("Prendre les médicaments", 0, true, false, false, 0),
        CreateTodo("Aller chercher les enfants à l'école", 0, true, false, false, 0),
        CreateTodo("Faire la lessive", -1, false, false, false, 1),
        CreateTodo("Nettoyer la salle de bain", -2, false, false, false, 2),
        CreateTodo("Arroser les plantes", -1),
        CreateTodo("Payer la facture d'électricité", -3, true, false, false, 1),
        CreateTodo("Faire l'épicerie", -1, true, false, false, 0),
        CreateTodo("Sortir les poubelles", -1, true, true),
        CreateTodo("Faire le lit", 0, false, true),
        CreateTodo("Pelleter la neige", -10, false, true, true),
        CreateTodo("Prendre rendez-vous chez le dentiste", -1, true, false, false, 5)
    ];

    public static async Task SeedAsync(TaskFlowDbContext context) {
        if (context.ToDos.Any()) return;

        var todos = InitialTodos;
        context.ToDos.AddRange(todos);
        await context.SaveChangesAsync();
    }
}