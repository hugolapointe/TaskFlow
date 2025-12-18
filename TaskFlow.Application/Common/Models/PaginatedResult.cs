namespace TaskFlow.Application.Common.Models;

using System.Collections.Generic;

public sealed class PaginatedResult<T> {
    public IReadOnlyList<T> Items { get; init; } = new List<T>();
    public string? NextCursor { get; init; }
    public string? PrevCursor { get; init; }
    public int? TotalCount { get; init; }
}
