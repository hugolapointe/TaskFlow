using Microsoft.EntityFrameworkCore;
using TaskFlow.Core.Data;
using TaskFlow.Core.Domain.Entities;

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

    public async Task<bool> ArchiveAsync(int id) {
        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return false;

        todo.IsArchived = true;
        todo.UpdatedAt = DateTime.UtcNow;
        await context.SaveChangesAsync();

        return true;
    }
}