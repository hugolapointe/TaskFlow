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

    public async Task<ToDo?> UpdateAsync(
        int id,
        string description,
        DateTime? dueDate,
        bool isPriority) {

        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.Description = description;
        todo.DueDate = dueDate;
        todo.IsPriority = isPriority;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<ToDo?> ToggleCompleteAsync(int id) {
        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.IsCompleted = !todo.IsCompleted;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<ToDo?> TogglePriorityAsync(int id) {
        var todo = await context.ToDos
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return null;

        todo.IsPriority = !todo.IsPriority;
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<bool> ArchiveAsync(int id) {
        var todo = await context.ToDos
                .FirstOrDefaultAsync(x => x.Id == id && !x.IsArchived);

        if (todo is null) return false;

        todo.IsArchived = true;
        await context.SaveChangesAsync();

        return true;
    }
}