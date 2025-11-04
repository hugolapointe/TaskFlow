namespace TaskFlow.WebAPI.Models.ToDo;

public record ToDoItem(
    int Id,
    string Description,
    string? DueDate,
    bool IsPriority,
    bool IsCompleted,
    string CreatedAt,
    string? UpdatedAt
);

public record ToDoDetails(
    int Id,
    string Description,
    string? DueDate,
    bool IsPriority,
    bool IsCompleted,
    string CreatedAt,
    string? UpdatedAt
);

public record ToDoStats(
    int Total,
    int Priority,
    int NonPriority,
    int Completed
);