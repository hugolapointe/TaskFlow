using Microsoft.EntityFrameworkCore;

using TaskFlow.Core.Domain.Entities;
using TaskFlow.Core.Domain.Interfaces;

namespace TaskFlow.Core.Data;

public class TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> options) : DbContext(options) {

    public DbSet<ToDo> ToDos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) {
        
        UpdateTimestamps();

        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps() {

        var entries = ChangeTracker.Entries<IAuditable>();

        foreach (var entry in entries) {
            if (entry.State == EntityState.Added) {
                entry.Entity.CreatedAt = DateTime.UtcNow;
                entry.Entity.UpdatedAt = DateTime.UtcNow;

            } else if (entry.State == EntityState.Modified) {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}