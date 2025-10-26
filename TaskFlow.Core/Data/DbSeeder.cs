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
        // Daily priority tasks
        CreateTodo(
            description: "Walk the dog",
            daysOffset: 0,
            dueDaysOffset: 0,
            isPriority: true
        ),
        CreateTodo(
            description: "Take medication",
            daysOffset: 0,
            dueDaysOffset: 0,
            isPriority: true
        ),
        CreateTodo(
            description: "Pick up kids from school",
            daysOffset: 0,
            dueDaysOffset: 0,
            isPriority: true
        ),

        // Regular household tasks
        CreateTodo(
            description: "Do the laundry",
            daysOffset: -1,
            dueDaysOffset: 1
        ),
        CreateTodo(
            description: "Clean the bathroom",
            daysOffset: -2,
            dueDaysOffset: 2
        ),
        CreateTodo(
            description: "Water the plants",
            daysOffset: -1
        ),

        // Urgent tasks
        CreateTodo(
            description: "Pay electricity bill",
            daysOffset: -3,
            dueDaysOffset: 1,
            isPriority: true
        ),
        CreateTodo(
            description: "Buy groceries",
            daysOffset: -1,
            dueDaysOffset: 0,
            isPriority: true
        ),

        // Completed tasks
        CreateTodo(
            description: "Take out the trash",
            daysOffset: -1,
            isPriority: true,
            isCompleted: true
        ),
        CreateTodo(
            description: "Make the bed",
            daysOffset: 0,
            isCompleted: true
        ),

        // Archived tasks
        CreateTodo(
            description: "Shovel the snow",
            daysOffset: -10,
            isCompleted: true,
            isArchived: true
        ),

        // Future tasks
        CreateTodo(
            description: "Schedule dentist appointment",
            daysOffset: -1,
            dueDaysOffset: 5,
            isPriority: true
        )
    ];

    public static async Task SeedAsync(TaskFlowDbContext context) {
        if (context.ToDos.Any()) return;

        var todos = InitialTodos;
        context.ToDos.AddRange(todos);
        await context.SaveChangesAsync();
    }
}