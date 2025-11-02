using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskFlow.WebAPI.Models.ToDo;

public record ToDoQuery(
    ToDoSortBy SortBy = ToDoSortBy.CreatedAt,
    bool? IsPriority = null,
    bool? IsCompleted = null,

    [Range(1, int.MaxValue)]
    int Page = 1,

    [Range(1, 100)]
    int PageSize = 10
) {
    public int Skip => (Page - 1) * PageSize;
    public int Take => PageSize;
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ToDoSortBy {
    CreatedAt,
    DueDate
}