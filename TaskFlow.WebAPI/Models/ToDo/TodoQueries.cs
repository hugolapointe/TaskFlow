using System.Text.Json.Serialization;

namespace TaskFlow.WebAPI.Models.ToDo;

public record ToDoQuery(
    ToDoSortBy SortBy,
    bool? IsPriority = null,
    bool? IsCompleted = null
);

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ToDoSortBy {
    CreatedAt,
    DueDate
}