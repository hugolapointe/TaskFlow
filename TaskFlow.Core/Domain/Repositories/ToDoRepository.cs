using Microsoft.EntityFrameworkCore;

using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.Enums;
using TaskFlow.Core.Domain.ValueObjects;

namespace TaskFlow.Core.Domain.Repositories;

public class ToDoRepository(TaskFlowDbContext context) {

    public async Task<ToDo?> GetByIdAsync(int id) {

        return await context.ToDos.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);
    }

    public async Task<IEnumerable<ToDo>> GetAllAsync(
        bool? isPriority = null,
        bool? isCompleted = null,
        ToDoSortBy? sortBy = ToDoSortBy.CreatedAt) {

        var query = context.ToDos.AsNoTracking()
            .Where(todo => !todo.IsArchived);

        query = ApplyFilters(query, isPriority, isCompleted);
        query = ApplySorting(query, sortBy!.Value);

        return await query.ToListAsync();
    }

    public async Task<ToDoStatistics> GetStatsAsync() {

        var stats = await context.ToDos.AsNoTracking()
            .Where(todo => !todo.IsArchived)
            .Select(todo => new {
                todo.IsCompleted,
                todo.IsPriority
            })
            .ToListAsync();

        if (stats.Count == 0) {
            return ToDoStatistics.Empty;
        }

        var total = stats.Count;
        var completed = stats.Count(t => t.IsCompleted);
        var priority = stats.Count(t => t.IsPriority && !t.IsCompleted);
        var nonPriority = stats.Count(t => !t.IsPriority && !t.IsCompleted);

        return new ToDoStatistics(total, priority, nonPriority, completed);
    }

    private static IQueryable<ToDo> ApplyFilters(
        IQueryable<ToDo> query,
        bool? isPriority,
        bool? isCompleted) {

        if (!isPriority.HasValue && !isCompleted.HasValue)
            return query;

        return query.Where(todo =>
            (!isPriority.HasValue || todo.IsPriority == isPriority.Value) &&
            (!isCompleted.HasValue || todo.IsCompleted == isCompleted.Value)
        );
    }

    private static IQueryable<ToDo> ApplySorting(
        IQueryable<ToDo> query,
        ToDoSortBy sortBy) {

        return sortBy switch {
            ToDoSortBy.DueDate => query
                .OrderBy(todo => todo.DueDate == null)
                .ThenBy(todo => todo.DueDate),
            _ => query.OrderByDescending(todo => todo.CreatedAt)
        };
    }
}
