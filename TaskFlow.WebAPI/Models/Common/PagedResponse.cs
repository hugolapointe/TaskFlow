namespace TaskFlow.WebAPI.Models.Common;

public record PagedResponse<T>(
    IEnumerable<T> Items,
    int Page,
    int PageSize,
    int TotalCount,
    int TotalPages
) {
    public bool HasNextPage => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
}
