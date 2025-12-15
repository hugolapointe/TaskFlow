namespace TaskFlow.Application.Common.Interfaces;

using System;
using System.Collections.Generic;
using TaskFlow.Domain.Tasks;

public interface ITaskRepository {
    Task<TaskAggregate?> GetByIdAsync(Guid id, CancellationToken ct);
    Task AddAsync(TaskAggregate task, CancellationToken ct);
    Task UpdateAsync(TaskAggregate task, CancellationToken ct);
    Task<IReadOnlyList<TaskAggregate>> GetByTagAsync(string tagName, int limit, string? afterCursor, CancellationToken ct);
    Task<IReadOnlyList<TaskAggregate>> SearchAsync(
    string? search,
    TaskStatus? status,
    TaskImportance? importance,
    DateTime? scheduledAt,
    TaskSortBy sortBy,
    bool desc,
    int limit,
    string? afterCursor,
    CancellationToken ct);
}
