using Microsoft.EntityFrameworkCore;

using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.Enums;

namespace TaskFlow.Core.Domain.Services;

public class ToDoService(TaskFlowDbContext context) {

    public async Task<ToDo> CreateAsync(
        string description,
        DateTime? dueDate = null,
        bool isPriority = false) {

        var todo = new ToDo(description) {
            DueDate = dueDate,
            IsPriority = isPriority,
        };

        context.ToDos.Add(todo);
        await context.SaveChangesAsync();
        return todo;
    }

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

    public async Task<ToDo?> UpdateDescriptionAsync(int id, string description) {

        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.Description = description;
        todo.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<ToDo?> UpdateDueDateAsync(int id, DateTime? dueDate) {

        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.DueDate = dueDate;
        todo.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<ToDo?> ToggleCompleteAsync(int id) {

        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.IsCompleted = !todo.IsCompleted;
        todo.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<ToDo?> TogglePriorityAsync(int id) {

        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.IsPriority = !todo.IsPriority;
        todo.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task ArchiveAsync(int id) {

        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return;

        todo.IsArchived = true;
        todo.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();
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
            ToDoSortBy.DueDate => query.OrderBy(todo => todo.DueDate.HasValue),
            _ => query.OrderByDescending(todo => todo.CreatedAt)
        };
    }
}