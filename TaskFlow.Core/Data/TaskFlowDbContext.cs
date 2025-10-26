using Microsoft.EntityFrameworkCore;

using TaskFlow.Core.Domain.Entities;

namespace TaskFlow.Core.Data;

public class TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> options) : DbContext(options) {
    public DbSet<ToDo> ToDos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ToDo>(entity => {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.IsPriority).HasDefaultValue(false);
            entity.Property(e => e.IsCompleted).HasDefaultValue(false);
            entity.Property(e => e.IsArchived).HasDefaultValue(false);
        });
    }
}