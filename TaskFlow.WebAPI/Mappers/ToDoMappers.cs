using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.ValueObjects;
using TaskFlow.WebAPI.Models.Common;
using TaskFlow.WebAPI.Models.ToDo;

namespace TaskFlow.WebAPI.Mappers;

public static class ToDoMappers {
    private const string DATE_FORMAT = "yyyy-MM-dd";
    private const string DATETIME_FORMAT = "yyyy-MM-ddTHH:mm:ss";

    public static Core.Domain.Enums.ToDoSortBy AsSortBy(this ToDoSortBy sortBy) {
  return sortBy switch {
  ToDoSortBy.DueDate => Core.Domain.Enums.ToDoSortBy.DueDate,
   _ => Core.Domain.Enums.ToDoSortBy.CreatedAt,
        };
    }

    public static ToDoItem AsItem(this ToDo todo) {
        return new(
  todo.Id,
  todo.Description,
   todo.DueDate?.ToString(DATE_FORMAT),
       todo.IsPriority,
 todo.IsCompleted,
    todo.CreatedAt.ToString(DATETIME_FORMAT),
 todo.UpdatedAt.ToString(DATETIME_FORMAT)
  );
    }

    public static ToDoDetails AsDetails(this ToDo todo) {
        return new(
 todo.Id,
     todo.Description,
     todo.DueDate?.ToString(DATE_FORMAT),
            todo.IsPriority,
      todo.IsCompleted,
       todo.CreatedAt.ToString(DATETIME_FORMAT),
  todo.UpdatedAt.ToString(DATETIME_FORMAT)
   );
    }

 public static ItemList<ToDoItem> AsItemList(this IEnumerable<ToDo> todos) {
      var items = todos.Select(t => t.AsItem()).ToList();
      return new(items, items.Count);
    }

    public static ToDoStats AsStatsDto(this ToDoStatistics statistics) {
  return new ToDoStats(
      Total: statistics.Total,
            Priority: statistics.Priority,
 NonPriority: statistics.NonPriority,
          Completed: statistics.Completed
        );
  }
}
