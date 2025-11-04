namespace TaskFlow.WebAPI.Models.Common;

public record ItemList<T>(
    IEnumerable<T> Items,
    int TotalCount
);
