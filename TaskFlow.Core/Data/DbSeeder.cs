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

        var todo = new ToDo(description) {
            DueDate = dueDaysOffset.HasValue ? DateTime.UtcNow.AddDays(dueDaysOffset.Value) : null,
            IsPriority = isPriority,
            IsCompleted = isCompleted,
            IsArchived = isArchived
        };

        if (daysOffset != 0) {
            todo.CreatedAt = DateTime.UtcNow.AddDays(daysOffset);
            todo.UpdatedAt = todo.CreatedAt;
        }

        return todo;
    }

    private static IEnumerable<ToDo> InitialTodos => [
        
        CreateTodo("Walk the dog", 0, true, false, false, 0),
        CreateTodo("Take medication", 0, true, false, false, 0),
        CreateTodo("Pick up kids from school", 0, true, false, false, 0),
        CreateTodo("Do the laundry", -1, false, false, false, 1),
        CreateTodo("Clean the bathroom", -2, false, false, false, 2),
        CreateTodo("Water the plants", -1, false, false, false, 3),
        CreateTodo("Pay electricity bill", -3, true, false, false, 5),
        CreateTodo("Buy groceries", -1, true, false, false, 0),
        CreateTodo("Take out the trash", -1, true, true),
        CreateTodo("Make the bed", 0, false, true),
        CreateTodo("Shovel snow", -10, false, true, true),
        CreateTodo("Schedule dentist appointment", -2, true, false, false, 7)
    ];

    public static async Task SeedAsync(TaskFlowDbContext context) {
        
        if (context.ToDos.Any()) return;

        var todos = InitialTodos;
        context.ToDos.AddRange(todos);
        await context.SaveChangesAsync();
    }
}