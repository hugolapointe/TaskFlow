using TaskFlow.Core.Domain.Entities;
using TaskFlow.WebAPI.Models.ToDo;

namespace TaskFlow.WebAPI.Mappers;

public static class ToDoMappers {
    private const string DATE_FORMAT = "yyyy-MM-dd";

  // Map ToDoSortBy from WebAPI to Core.Domain
    public static Core.Domain.Enums.ToDoSortBy AsSortBy(this ToDoSortBy sortBy) {

return sortBy switch {
        ToDoSortBy.DueDate => Core.Domain.Enums.ToDoSortBy.DueDate,
            _ => Core.Domain.Enums.ToDoSortBy.CreatedAt,
        };
    }

    // Map ToDo from Core.Domain to ToDoItem
    public static ToDoItem AsItem(this ToDo todo) {

        return new(
   todo.Id,
     todo.Description,
            todo.DueDate?.ToString(DATE_FORMAT),
     todo.IsPriority,
            todo.IsCompleted
 );
    }

    // Map ToDo from Core.Domain to ToDoDetails
    public static ToDoDetails AsDetails(this ToDo todo) {

        return new(
     todo.Id,
  todo.Description,
     todo.DueDate?.ToString(DATE_FORMAT),
            todo.IsPriority,
            todo.IsCompleted,
            todo.CreatedAt.ToString(DATE_FORMAT),
          todo.UpdatedAt.ToString(DATE_FORMAT)
        );
    }

    // Map IEnumerable<ToDo> to ToDoItemList
    public static ToDoItemList AsItemList(this IEnumerable<ToDo> todos) {

   var items = todos.Select(t => t.AsItem()).ToList();
        var completedCount = items.Count(t => t.IsCompleted);

        return new(items, items.Count, completedCount);
    }
}
