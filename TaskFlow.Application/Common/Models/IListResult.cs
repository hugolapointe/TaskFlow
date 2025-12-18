namespace TaskFlow.Application.Common.Models;

using System.Collections.Generic;

public sealed class ListResult<T> {

    public IReadOnlyList<T> Items { get; init; } = new List<T>();
    public int Count { get; init; }
}
