namespace TaskFlow.Infrastructure.Persistence.Repositories;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using TaskFlow.Application.Common.Interfaces;
using TaskFlow.Domain.Tasks;

public class TaskRepository : ITaskRepository {
    private readonly ApplicationDbContext _context;

    public TaskRepository(ApplicationDbContext context) {
        _context = context;
    }

    public async Task AddAsync(TaskAggregate task, CancellationToken ct) {
        await _context.Tasks.AddAsync(task, ct);
    }

    public async Task<TaskAggregate?> GetByIdAsync(Guid id, CancellationToken ct) {
        return await _context.Tasks
            .Include(t => t.Tags) // Include tags when retrieving a task
            .FirstOrDefaultAsync(t => t.Id == id, ct);
    }

    public async Task<IReadOnlyList<TaskAggregate>> GetByTagAsync(string tagName, int limit, string? afterCursor, CancellationToken ct) {
        IQueryable<TaskAggregate> query = _context.Tasks
            .Include(t => t.Tags)
            .Where(t => t.Tags.Any(tag => tag.Name == tagName))
            .OrderByDescending(t => t.CreatedAt); // Default ordering for pagination

        if (!string.IsNullOrEmpty(afterCursor) && Guid.TryParse(afterCursor, out Guid cursorId)) {
            // Assuming cursor is based on Task Id for simplicity
            query = query.Where(t => t.Id.CompareTo(cursorId) < 0);
        }

        return await query.Take(limit).ToListAsync(ct);
    }

    public async Task<IReadOnlyList<TaskAggregate>> SearchAsync(
        string? search,
        TaskFlow.Domain.Tasks.TaskStatus? status,
        TaskImportance? importance,
        DateTime? scheduledAt,
        TaskSortBy sortBy,
        bool desc,
        int limit,
        string? afterCursor,
        CancellationToken ct) {
        IQueryable<TaskAggregate> query = _context.Tasks
            .Include(t => t.Tags);

                if (!string.IsNullOrEmpty(search))

                {

                    query = query.Where(t => t.Description.Contains(search));

                }

                if (status.HasValue)

                {

                    query = query.Where(t => t.Status == (TaskFlow.Domain.Tasks.TaskStatus)status.Value);

                }

        if (importance.HasValue) {
            query = query.Where(t => t.Importance == importance.Value);
        }

        if (scheduledAt.HasValue) {
            query = query.Where(t => t.ScheduledAt.HasValue && t.ScheduledAt.Value.Date == scheduledAt.Value.Date);
        }

        // Apply sorting
                query = sortBy switch
                {
                    TaskSortBy.CreatedAt => desc ? query.OrderByDescending(t => t.CreatedAt) : query.OrderBy(t => t.CreatedAt),
                    TaskSortBy.DueDate => desc ? query.OrderByDescending(t => t.DueDate) : query.OrderBy(t => t.DueDate),
                    _ => query.OrderByDescending(t => t.CreatedAt) // Default sort
                };

        if (!string.IsNullOrEmpty(afterCursor) && Guid.TryParse(afterCursor, out Guid cursorId)) {
            // Assuming cursor is based on the primary key for simplicity
            if (desc) {
                query = query.Where(t => t.Id.CompareTo(cursorId) < 0);
            } else {
                query = query.Where(t => t.Id.CompareTo(cursorId) > 0);
            }
        }

        return await query.Take(limit).ToListAsync(ct);
    }

    public Task UpdateAsync(TaskAggregate task, CancellationToken ct) {
        _context.Tasks.Update(task);
        return Task.CompletedTask;
    }
}
