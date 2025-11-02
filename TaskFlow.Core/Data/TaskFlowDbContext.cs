using Microsoft.EntityFrameworkCore;

using TaskFlow.Core.Domain.Entities;

namespace TaskFlow.Core.Data;

public class TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> options) : DbContext(options) {

    public DbSet<ToDo> ToDos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);
    }
}