using TaskFlow.Core.Domain.Entities;
using TaskFlow.WebAPI.Models.ToDo;

namespace TaskFlow.WebAPI.Mappers;

public static class ToDoMappers {
    private const string DATE_FORMAT = "yyyy-MM-dd";

    // -----------------------
    // API -> Domain
    // -----------------------
    public static Core.Domain.Enums.ToDoSortBy AsSortBy(this ToDoSortBy sortBy) =>
            sortBy switch {
                ToDoSortBy.DueDate => Core.Domain.Enums.ToDoSortBy.DueDate,
                _ => Core.Domain.Enums.ToDoSortBy.CreatedAt,
            };

    // -----------------------
    // Domain -> API
    // -----------------------
    public static ToDoItem AsItem(this ToDo todo) => new(
            todo.Id,
            todo.Description,
            todo.DueDate?.ToString(DATE_FORMAT),
            todo.IsPriority,
            todo.IsCompleted
        );

    public static ToDoDetails AsDetails(this ToDo todo) => new(
            todo.Id,
            todo.Description,
            todo.DueDate?.ToString(DATE_FORMAT),
            todo.IsPriority,
            todo.IsCompleted,
            todo.CreatedAt.ToString(DATE_FORMAT),
            todo.UpdatedAt.ToString(DATE_FORMAT)
        );

    public static ToDoItemList AsItemList(this IEnumerable<ToDo> todos) {

        var items = todos.Select(t => t.AsItem()).ToList();
        var completedCount = items.Count(t => t.IsCompleted);

        return new(items, items.Count, completedCount);
    }
}

