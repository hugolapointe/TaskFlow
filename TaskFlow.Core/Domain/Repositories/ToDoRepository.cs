using Microsoft.EntityFrameworkCore;

using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.Enums;

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

    public async Task<(int Total, int Priority, int NonPriority, int Completed)> GetStatsAsync() {
        var stats = await context.ToDos.AsNoTracking()
            .Where(todo => !todo.IsArchived)
            .GroupBy(_ => 1)
            .Select(g => new {
                Total = g.Count(),
                Completed = g.Count(t => t.IsCompleted),
                Priority = g.Count(t => t.IsPriority && !t.IsCompleted),
                NonPriority = g.Count(t => !t.IsPriority && !t.IsCompleted)
            })
            .FirstOrDefaultAsync();

        return (stats?.Total ?? 0, stats?.Priority ?? 0, stats?.NonPriority ?? 0, stats?.Completed ?? 0);
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
