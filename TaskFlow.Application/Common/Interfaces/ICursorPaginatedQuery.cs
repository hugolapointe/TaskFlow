namespace TaskFlow.Application.Common.Interfaces;

public interface ICursorPaginatedQuery {
    int Limit { get; }
    string? After { get; }
    string? Before { get; }
    string? SortBy { get; }
    bool Desc { get; }
}
